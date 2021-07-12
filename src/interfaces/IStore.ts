import { IComponent } from "./IComponent";
import { IMeta } from "./IMeta";

interface IUIFlags {
    leftBar: {
        dirTree: boolean;
        projectTree: boolean;
        componentsLibrary: boolean;
    },
    rightBar: {
        propsEditor: boolean;
        stateEditor: boolean;
    },
    workplace: {
        viewAll: boolean;
        currentScreenId: string | null;
        currentFilePath: string | null;
        isDragMode: boolean;
        tabs: any[],
        openFolders: Object
    }
}

interface IProject {
    name: string;
    simpleLoading: boolean;
    selected?: IComponent | string;
    hovered?: IComponent | string;
    structure: IComponent[];
    status: string;
}

export interface IStore {
    meta: IMeta;
    flags: IUIFlags;
    project: IProject;
}