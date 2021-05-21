import { raxyReact, logger } from '@tetragius/raxy-react';
import { meta } from '../meta';

const initStore = {
    meta,
    flags: {
        leftBar: {
            dirTree: true,
            projectTree: false,
            componentsLibrary: false
        },
        workplace: {
            viewAll: true,
            currentScreenId: '1',
            currentFileId: '2',
            isDragMode: false,
        }
    },
    project: {
        selected: null,
        hovered: null,
        structure: [
            { id: '1', name: 'PROJECT', type: 'root', isOpen: true },
            { id: '2', name: 'App', type: 'screen', parentId: '1', folderId: '5' },
        ]
    },
    fileSystem: [
        { id: '1', name: 'project', isFolder: true, isOpen: true },
        { id: '2', name: 'package.json', parentId: '1' },
        { id: '15', name: 'babel.config.js', parentId: '1' },
        { id: '16', name: 'tsconfig.json', parentId: '1' },
        { id: '17', name: 'webpack.config.js', parentId: '1' },
        { id: '3', name: 'src', isFolder: true, parentId: '1' }, // src

        { id: '7', name: 'index.tsx', parentId: '3' },
        { id: '8', name: 'index.ejs', parentId: '3' },
        { id: '4', name: 'containers', isFolder: true, parentId: '3' }, // containers

        { id: '9', name: 'index.ts', parentId: '4' },
        { id: '5', name: 'App', isFolder: true, parentId: '4' }, // App

        { id: '13', name: 'App.tsx', parentId: '5' },
        { id: '14', name: 'index.ts', parentId: '5' },


    ]
}

export const instanse = raxyReact(initStore);
export const { store, useRaxy } = instanse;

window['raxyInstanse'] = instanse;

// logger(instanse.subscribe)