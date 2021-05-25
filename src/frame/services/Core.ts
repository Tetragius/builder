import { store } from "../store/store"
import * as UI from "vienna-ui";
import * as Router from "react-router-dom";
import { Slot } from "../components";
import { loadInstanse } from "../../services/ModuleLoader";
import { IComponent, IMetaItem } from "../../interfaces";
import React from "react";

export const getElement = async (item: IComponent): Promise<any> => {
    if (item.isSlot) {
        return Slot;
    }

    if (item.namespace === 'react-router-dom') {
        return item.name?.split(".")
            .reduce((o: any, key: string) => {
                if (o) {
                    return o[key];
                }
                return Router[key];
            }, null);
    }

    if (item.custom) {
        return loadInstanse(item.name);
    }

    if (item.namespace === 'native') {
        return React.createElement(item.name);
    }

    const element = item.name?.split(".")
        .reduce((o: any, key: string) => {
            if (o) {
                return o[key];
            }
            return UI[key];
        }, null)

    return element
};

export const uniqueId = () => Math.random().toString(16).split('.')[1];

export const fillElement = async (item: IComponent, styler: any, nowrap: boolean): Promise<{ default: any }> => {

    const instanse = await getElement(item);

    return { default: nowrap ? (item.namespace === 'vienna-ui' ? styler(instanse) : instanse) : instanse };
};

export const createComponent = (name: string, meta: IMetaItem, parentId: string): IComponent => {
    return {
        id: uniqueId(),
        name,
        parentId,
        custom: meta.namespace === 'custom',
        state: { left: 0, top: 0 },
        ...meta,
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
        resizable: 'none',
        state: { left: 0, top: 0 },
    }
}

export const extractProps = (props) => {
    const result = {};

    for (const prop in props) {
        result[prop] = props[prop].value;
    }
    return result;
}

export const cleanProp = (prop, value) => {
    switch (true) {
        case prop.startsWith('$'):
            return '';
        case (typeof value === 'string' && !!value):
            return `${prop}='${value}'`;
        case typeof value === 'number':
            return `${prop}={${value}}`;
        case typeof value === 'boolean':
            return value ? `${prop}` : '';
        default:
            return '';
    }
}

export const constructProps = (props) => {
    const result = [];
    for (const prop in props) {
        result.push(cleanProp(prop, props[prop].value));
    }
    return result.filter(r => r).join(' ');
}