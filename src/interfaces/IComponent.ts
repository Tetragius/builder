import { IMetaItem } from './IMeta';

export interface IComponent extends IMetaItem {
    id: string;
    parentId?: string;
    name: string;
    parent?: IComponent;
    styled?: boolean;
    isSlot?: boolean;
    custom?: boolean;
    folderId?: string;
    isOpen?: boolean;
}