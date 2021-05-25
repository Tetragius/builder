import { IMeta } from "../../interfaces";

export const  metaReactRouter: IMeta = {
    'HashRouter': {
        namespace: 'react-router-dom',
        allowChildren: 'all',
        nowrap: false,
        toolIcon: 'Body',
        resizable: 'none',
    },
    'Route': {
        namespace: 'react-router-dom',
        nowrap: false,
        toolIcon: 'Body',
        allowChildren: 'all',
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