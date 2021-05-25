import { IComponent } from "./IComponent";
import { IFile } from "./IFile";
import { IMeta } from "./IMeta";

interface IUIFlags {
    leftBar: {
        dirTree: boolean;
        projectTree: boolean;
        componentsLibrary: boolean;
    },
    workplace: {
        viewAll: boolean;
        currentScreenId: string | null;
        currentFileId: string | null;
        isDragMode: boolean;
        tabs: any[]
    }
}

interface IProject {
    name: string;
    selected: any;
    hovered: any;
    structure: IComponent[];
}

export interface IStore {
    meta: IMeta;
    flags: IUIFlags;
    project: IProject;
    fileSystem: IFile[]
}