import { DnDSinglle } from "../services/DnD"
import path from 'path';
import { FS } from "../services";

export const dirTreeListener = (message: any) => {
    if (message?.reciever?.name === 'DIR_TREE') {
        const itemPath = message.data.object.path;
        const recieverPath = message.reciever.object.path;

        if (itemPath)
            if (FS.isDirectory(recieverPath)) {
                FS.rename(itemPath, path.resolve(recieverPath, itemPath.split('/').pop()))
            }
            else {
                const dirName = path.dirname(recieverPath);
                FS.rename(itemPath, path.resolve(dirName, itemPath.split('/').pop()))
            }

    }
}

DnDSinglle.subscribe(dirTreeListener);