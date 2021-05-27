import { IInstanseType } from "./IINstanseType";

type ResizeTypes = 'none' | 'all' | 'x' | 'y';

type ChildrenTypes = 'all' | 'string' | null | string[];

type NamespesTypes = 'native' | 'custom' | 'layer' | string;

interface IStringProps {
    value: string;
}

interface IListProps {
    value: IListProps['values'][number];
    values: Array<string | number | boolean>;
}

interface IBoolProps {
    value: boolean;
    values: [true, false];
}

type MetsPropTypes = IStringProps | IListProps | IBoolProps | undefined;

interface IMetaStyle { }

interface IMetaItemProps {
    $text?: IStringProps;
    [name: string]: MetsPropTypes;
}

export interface IMetaItem {
    type?: IInstanseType;
    namespace: NamespesTypes;
    toolIcon: string;
    resizable?: ResizeTypes;
    nowrap?: boolean;
    nowrapChildren?: boolean;
    allowChildren?: ChildrenTypes;
    disallowChildren?: ChildrenTypes
    defaultChildren?: string[];
    props?: IMetaItemProps;
    style: any;
    esmLink?: string;
    slots?: string[]
}

export interface IMeta {
    [name: string]: IMetaItem;
}