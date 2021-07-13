import React, { DragEvent } from "react";
import { store } from '../store/store';

export class DnD {

    listeners: any[] = [];
    dataTransfer: any = null;

    constructor() { }

    onDragStart(e: any, name: any, object: any) {
        e.stopPropagation();
        store.flags.workplace.isDragMode = true;
        this.dataTransfer = { name, object };
    }

    onDragEnd(e: any, name: any, object: any) {
        e.stopPropagation();
        store.flags.workplace.isDragMode = false;
        this.dataTransfer = null;
    }

    onDragOver(e: DragEvent, name: any, object: any) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        this.notify({ type: 'over', reciever: { name, object }, data: this.dataTransfer })
    }

    onDrop(e: any, name: any, object: any) {
        e.preventDefault();
        e.stopPropagation();
        store.flags.workplace.isDragMode = false;
        this.notify({ type: 'drop', reciever: { name, object }, data: this.dataTransfer })
        this.dataTransfer = null;
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


export const DnDSinglle = window.frameElement ? window.parent['DnD'] : window['DnD'] || new DnD();

if (!window.frameElement) {
    window['DnD'] = DnDSinglle;
}

export const DnDHOC = (name: string, Component: any, service: DnD = DnDSinglle) =>
    (props: any) => <Component
        {...props}
        onDragStart={(e: any) => service.onDragStart(e, name, props)}
        onDragOver={(e: any) => service.onDragOver(e, name, props)}
        onDragEnd={(e: any) => service.onDragEnd(e, name, props)}
        onDrop={(e: any) => service.onDrop(e, name, props)} />