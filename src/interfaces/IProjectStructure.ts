interface IProjectItem {
    path: string;
    name: string;
    content?: string;
    isFolder?: boolean;
}

export type IProjectStructure = IProjectItem[];