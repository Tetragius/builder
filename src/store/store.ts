import { raxyReact, logger, connectDevTools, IRaxyWithHook } from '@tetragius/raxy-react';
import { IStore } from '../interfaces';
import { metaViennaUi, metaNative, metaReactRouter } from './meta';

const initStore: IStore = {
    meta: { ...metaViennaUi, ...metaNative, ...metaReactRouter },
    flags: {
        leftBar: {
            dirTree: true,
            projectTree: false,
            componentsLibrary: false
        },
        rightBar: {
            propsEditor: true,
            stateEditor: false
        },
        workplace: {
            viewAll: true,
            currentScreenId: null,
            currentFilePath: null,
            isDragMode: false,
            tabs: [],
            openFolders: {}
        }
    },
    project: {
        name: '',
        simpleLoading: true,
        selected: undefined,
        hovered: undefined,
        structure: [],
        status: '' 
    },
}

export const instanse: IRaxyWithHook<IStore> = window.parent['raxyInstanse'] ?? raxyReact(initStore);
export const { store, useRaxy } = instanse;

// logger(instanse.subscribe)
// connectDevTools(instanse);