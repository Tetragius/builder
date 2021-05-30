import { IComponent } from "./IComponent";
import { IFile } from "./IFile";
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
        currentFile: IFile | null;
        isDragMode: boolean;
        tabs: any[]
    }
}

interface IProject {
    name: string;
    simpleLoading: boolean;
    selected: IComponent | IFile;
    hovered: IComponent | IFile;
    structure: IComponent[];
    status: string;
}

export interface IStore {
    meta: IMeta;
    flags: IUIFlags;
    project: IProject;
    fileSystem: IFile[];
}