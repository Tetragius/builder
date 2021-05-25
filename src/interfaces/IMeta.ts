type ResizeTypes = 'none' | 'all' | 'x' | 'y';

type ChildrenTypes = 'all' | 'string' | null | string[];

type NamespesTypes = 'native' | 'custom' | 'screen' | string;

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

interface IMetaStyle {
    [name: string]: string;
}

interface IMetaItemState {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
    height?: number;
    width?: number;
    style?: IMetaStyle;
}

interface IMetaItemProps {
    $text?: IStringProps;
    [name: string]: MetsPropTypes;
}

export interface IMetaItem {
    namespace: NamespesTypes;
    toolIcon: string;
    resizable?: ResizeTypes;
    nowrap?: boolean;
    nowrapChildren?: boolean;
    allowChildren?: ChildrenTypes;
    disallowChildren?: ChildrenTypes
    defaultChildren?: string[];
    props?: IMetaItemProps;
    state?: IMetaItemState;
    esmLink?: string;
    slots?: string[]
}

export interface IMeta {
    [name: string]: IMetaItem;
}