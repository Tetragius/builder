import { IMeta } from "../../interfaces";

export const metaSystem: IMeta = {
    'Children': {
        namespace: 'system',
        toolIcon: 'Body',
        nowrap: true,
        allowChildren: null,
        resizable: 'none',
        props: {}
    },
    'Slot': {
        namespace: 'system',
        toolIcon: 'Body',
        nowrap: true,
        allowChildren: null,
        resizable: 'none',
        props: {
            name: { value: '' },
        }
    },
    'Property': {
        namespace: 'system',
        toolIcon: 'Body',
        nowrap: true,
        allowChildren: null,
        resizable: 'none',
        props: {
            name: { value: '' },
            defaultValue: { value: '' },
            type: { value: '', values: ['string', 'boolean', 'number'] },
        }
    },
    'Comment': {
        namespace: 'system',
        toolIcon: 'Body',
        allowChildren: null,
        resizable: 'none',
        props: {
            description: { value: '' },
        }
    },
    'Placeholder': {
        namespace: 'system',
        nowrap: true,
        toolIcon: 'Body',
        allowChildren: 'all',
        resizable: 'none',
    },
};

export default metaSystem;