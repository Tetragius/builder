import { IMeta } from "../../interfaces";

export const metaNative: IMeta = {
    'div': {
        namespace: 'native',
        toolIcon: 'Body',
        allowChildren: 'all',
        resizable: 'all',
        props: {
            $text: { value: '' },
            className: { value: '' },
        }
    },
    'span': {
        namespace: 'native',
        toolIcon: 'Body',
        allowChildren: 'all',
        resizable: 'all',
        props: {
            $text: { value: '' },
            className: { value: '' },
        }        
    },
};

export default metaNative;