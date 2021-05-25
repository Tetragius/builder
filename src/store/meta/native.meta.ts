import { IMeta } from "../../interfaces";

export const metaNative: IMeta = {
    'div': {
        namespace: 'native',
        toolIcon: 'Body',
        props: {
            $text: { value: '' }
        }
    },
    'input': {
        namespace: 'native',
        toolIcon: 'Input',
        allowChildren: null,
        props: {
            value: { value: '' },
            checked: { value: false, values: [true, false] }
        }
    },
};

export default metaNative;