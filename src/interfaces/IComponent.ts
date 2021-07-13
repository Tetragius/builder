import { IMetaItem } from './IMeta';

export interface IComponent extends IMetaItem {
    id: string;
    parentId?: string;
    name: string;
    styled?: boolean;
    custom?: boolean;
    path?: string;
    isOpen?: boolean;
}