import { DnDSinglle } from "../services"
import { store } from "../store/store";
import path from 'path';

const checkTree = (id: string | undefined, reciever: any): boolean => {

    if (!reciever.parentId) {
        return false;
    }

    if (reciever.parentId === id) {
        return true;
    }

    const nextReciever = store.fileSystem.find(item => item.id === reciever.parentId);
    return checkTree(id, nextReciever);
}

export const dirTreeListener = (message: any) => {
    if (message?.reciever?.name === 'DIR_TREE') {
        const item = store.fileSystem.find(item => item.id === message.data.object.item.id);
        const recieverItem = store.fileSystem.find(item => item.id === message.reciever.object.item.id);

        if (checkTree(item?.id, recieverItem)) {
            return;
        }

        if (item)
            if (recieverItem?.isFolder) {
                item.path = path.resolve(recieverItem.path, recieverItem.name);
            }
            else if (recieverItem) {
                item.path = path.resolve(recieverItem.path);
            }

    }
}

DnDSinglle.subscribe(dirTreeListener);