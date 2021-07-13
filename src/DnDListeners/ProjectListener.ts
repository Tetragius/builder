import { DnDSinglle } from "../services/DnD"
import { store } from "../store/store";

export const projectListener = (message: any) => {
    if (message?.reciever?.name === 'PROJECT_TREE' && message?.data?.name === 'PROJECT_TREE') {
        const item = store.project.structure.find(i => i.id === message.data.object.item.id);
        if (message.reciever.object.item.id !== message.data.object.item.id) {
            item.parentId = message.reciever.object.item.id;
        }
    }
    if (message?.reciever?.name === 'WRAPPER' && message?.data?.name === 'PROJECT_TREE') {
        const item = store.project.structure.find(i => i.id === message.data.object.item.id);
        if (message.reciever.object.item.id !== message.data.object.item.id) {
            item.parentId = message.reciever.object.item.id;
        }
    }
}

DnDSinglle.subscribe(projectListener);