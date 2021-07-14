import { IMeta } from "../../interfaces";

export const  metaReactRouter: IMeta = {
    'HashRouter': {
        namespace: 'react-router-dom',
        allowChildren: 'all',
        defaultChildren: ['Placeholder'],
        nowrap: true,
        toolIcon: 'Body',
        resizable: 'none',
    },
    'Route': {
        namespace: 'react-router-dom',
        nowrap: true,
        toolIcon: 'Body',
        allowChildren: 'all',
        defaultChildren: ['Placeholder'],
        resizable: 'none',
        props: {
            path: { value: '/' }
        }
    },
    'Link': {
        namespace: 'react-router-dom',
        nowrap: true,
        toolIcon: 'Link',
        allowChildren: 'all',
        resizable: 'none',
        props: {
            to: { value: '/' }
        }
    }
};

export default metaReactRouter;