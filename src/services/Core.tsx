import * as UI from "vienna-ui";
import path from 'path';
import * as Router from "react-router-dom";
import { Slot } from "../frame/components";
import { loadInstanse } from "./ModuleLoader";
import { IComponent, IFile, IMetaItem } from "../interfaces";
import React from "react";
import { store } from "../store/store";
import { FS } from "./FileSystem";
import { IProjectStructure } from "../interfaces/IProjectStructure";
import { defaultStyle } from "../store/meta/style";
import { cloneObject } from "../utils/cloneObject";

const takeElementFromLib = (lib: any, name: any) => {
    return name?.split(".")
        .reduce((o: any, key: string) => {
            if (o) {
                return o[key];
            }
            return lib[key];
        }, null);
}

export const getElement = async (item: IComponent): Promise<any> => {

    switch (true) {
        case item.isSlot:
            return Slot;
        case item.custom:
            return loadInstanse(item.name);
        case item.namespace === 'native':
            return (props) => React.createElement(item.name, { ...props }, item.allowChildren ? React.Children.toArray(props.children) : null);
        case item.namespace === 'react-router-dom':
            return takeElementFromLib(Router, item.name);
        case item.namespace === 'vienna-ui':
            return takeElementFromLib(UI, item.name);
    }

    return null;

};

export const uniqueId = () => Math.random().toString(16).split('.')[1];

export const fillElement = async (item: IComponent, styler: any, nowrap: boolean): Promise<{ default: any }> => {

    const instanse = await getElement(item);

    return { default: nowrap ? styler(instanse) : instanse };
};


export const createComponent = (name: string, meta: IMetaItem, parentId: string): IComponent => {
    return {
        id: uniqueId(),
        name,
        parentId,
        custom: meta.namespace === 'custom',
        ...meta,
        style: { ...cloneObject(defaultStyle) },
    }
}

export const addComponentToStore = (component: IComponent) => {
    store.project.structure.push(component);
}

export const createSlot = (name: string, parentId: string): IComponent => {
    return {
        id: uniqueId(),
        namespace: '',
        toolIcon: '',
        name,
        isSlot: true,
        parentId,
        nowrap: false,
        nowrapChildren: true,
        resizable: 'none'
    }
}

export const extractProps = (props) => {
    const result = {};

    for (const prop in props) {
        if (!prop.startsWith('$')) {
            result[prop] = props[prop].value;
        }
    }
    return result;
}

const getRemIdxs = (item) => store.project.structure
    .map((i, idx) => i.id === item.id ? [idx] : i.parentId === item.id ? getRemIdxs(i) : null)
    .filter(Array.isArray)
    .reduce((o, i) => (o.push(...i), o), []);


export const removeElement = (item: IComponent) => {
    const remIdxs = getRemIdxs(item);

    remIdxs.sort((a, b) => b - a).forEach(idx => {
        store.project.structure.splice(idx, 1);
    });
}

const getRemIdxsFile = (item): number[] => store.fileSystem
    .map((i, idx) => `${i?.path}/${i?.name}`.includes(item.name) ? idx : false)
    .filter(Boolean) as number[];


export const removeFile = (item: IFile) => {
    const remIdxs = getRemIdxsFile(item);

    remIdxs.sort((a, b) => b - a).forEach(idx => {
        store.fileSystem.splice(idx, 1);
    });
}

export const removeLayer = (item: IComponent) => {

    const folderId = item.folderId;
    const name = item.name;

    const remList = store.project.structure.filter(item => item.name == name);
    remList.forEach(removeElement);

    const folder = store.fileSystem.find(folder => folder.id === folderId) as IFile;
    FS.removeFolder(`${folder?.path}/${folder?.name}`);
    removeFile(folder);

    delete store.meta[name];
}

export const appendFileSystemProjectRoot = (name: string) => {
    store.fileSystem.push({
        id: uniqueId(),
        name: `${name}`,
        isFolder: true,
        path: '',
        editable: false,
        isOpen: true
    });
}

export const appendFileSystemItem = (dir: string, name: string, isFolder?: boolean, content?: string): string => {
    const _path = path.resolve(`./${store.project.name}`, `./${dir}`, `./${name}`);
    isFolder ? FS.mkdirSyncReq(_path) : FS.mkdirSyncReqFoeFile(_path);
    !isFolder && FS.writeFileSync(_path, content ?? '');

    const id = uniqueId();

    store.fileSystem.push({
        id,
        name: `${name}`,
        isFolder: isFolder ?? false,
        path: path.resolve(`./${store.project.name}`, `./${dir}`),
        editable: false,
        isOpen: false
    });

    return id;
}

export const createProjectStructure = (structure: IProjectStructure) => {
    structure.forEach(item => {
        appendFileSystemItem(item.path, item.name, item.isFolder, item.content);
    });
}

export const removeChildren = (item: IComponent) => {
    store.project.structure.forEach(i => {
        if (i.parentId === item.id) {
            removeElement(i);
        }
    });
}

export const updateMetaAndExistItems = (layer: IComponent, hasChildren) => {
    if (hasChildren && !store.meta[layer.name].allowChildren) {

        store.meta[layer.name].allowChildren = 'all';
        store.meta[layer.name].props = {
            $text: { value: '' }
        }

        store.project.structure.forEach(item => {
            if (item.name === layer.name) {
                item.allowChildren = 'all';
                item.props = {
                    $text: { value: '' }
                }
            }
        })
    }

    if (!hasChildren && store.meta[layer.name].allowChildren) {
        store.meta[layer.name].allowChildren = null;
        store.project.structure.forEach(item => {
            if (item.name === layer.name && item.id !== layer.id) {
                item.allowChildren = null;
                item.props = {};
                removeChildren(item);
            }
        })
    }
}