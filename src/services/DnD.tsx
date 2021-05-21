import React from "react";
import { store } from '../store/store';

export class DnD {

    listeners: any[] = [];

    constructor() { }

    onDragStart(e: any, name: any, object: any) {
        e.stopPropagation();
        store.flags.workplace.isDragMode = true;
        e.dataTransfer.setData('application/json', JSON.stringify({ name, object }));
    }

    onDragEnd(e: any, name: any, object: any) {
        e.stopPropagation();
        store.flags.workplace.isDragMode = false;
    }

    onDragOver(e: any) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
    }

    onDrop(e: any, name: any, object: any) {
        e.preventDefault();
        e.stopPropagation();
        store.flags.workplace.isDragMode = false;
        this.notify({ reciever: { name, object }, data: JSON.parse(e.dataTransfer.getData('application/json')) })
    }

    subscribe(listener: any) {
        this.listeners.push(listener);
    }

    unSubscribe(listener: any) {
        const idx = this.listeners.findIndex(listener);
        this.listeners.splice(idx, 1);
    }

    notify(message: any) {
        this.listeners.forEach(listener => listener(message));
    }

}

export const DnDSinglle = new DnD();

export const DnDHOC = (name: string, Component: any, service: DnD = DnDSinglle) =>
    (props: any) => <Component
        {...props}
        onDragStart={(e: any) => service.onDragStart(e, name, props)}
        onDragOver={(e: any) => service.onDragOver(e)}
        onDragEnd={(e: any) => service.onDragEnd(e, name, props)}
        onDrop={(e: any) => service.onDrop(e, name, props)} />