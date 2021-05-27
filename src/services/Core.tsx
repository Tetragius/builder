import * as UI from "vienna-ui";
import path from 'path';
import * as Router from "react-router-dom";
import { Slot } from "../frame/components";
import { loadInstanse } from "./ModuleLoader";
import { IComponent, IMetaItem } from "../interfaces";
import React from "react";
import { store } from "../store/store";
import { FS } from "./FileSystem";
import { IProjectStructure } from "../interfaces/IProjectStructure";

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
            return (props) => React.createElement(item.name, { ...props }, React.Children.toArray(props.children));
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

    return { default: nowrap ? (item.namespace === 'vienna-ui' ? styler(instanse) : instanse) : instanse };
};

export const defaultStyle = {
    position: 'relative',
    left: 0,
    top: 0,
    display: 'block',
    height: 100,
    width: 100,
    padding: '',
    margin: '',
    border: '',
    outline: '',
    borderRadius: '',
    borderTopLeftRadius: '',
    borderTopRightRadius: '',
    borderBottomLeftRadius: '',
    borderBottomRightRadius: '',
    boxShadow: '',
    boxSizing: '',
    background: '',
    color: '',
    fontSize: '',
    lineHeight: '',
    alignItems: '',
    justifyContent: '',
    flexDirection: '',
    flexWrap: '',
    cursor: '',
    opacity: ''
}

export const createComponent = (name: string, meta: IMetaItem, parentId: string): IComponent => {
    return {
        id: uniqueId(),
        name,
        parentId,
        custom: meta.namespace === 'custom',
        ...meta,
        style: { ...defaultStyle },
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


export const removeElement = (item) => {
    const remIdxs = getRemIdxs(item);

    remIdxs.sort((a, b) => b - a).forEach(idx => {
        store.project.structure.splice(idx, 1);
    });
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