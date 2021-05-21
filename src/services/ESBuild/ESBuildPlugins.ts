import { Plugin } from 'esbuild';
import path from 'path-browserify';
import { existsSync, readFileAsync } from '../FileSystem';

const namespace = 'virtual';

const resolve = ({ id, importer }: { id: string; importer: string; }) => {
    let resolvedPath = id;
    if (importer && id.startsWith('.')) {
        resolvedPath = path.resolve(path.dirname(importer), id);
    }
    for (const x of ['', '.ts', '.js', '.css']) {
        const realPath = resolvedPath + x;
        if (existsSync(realPath)) {
            return realPath;
        }
    }
    throw new Error(`${resolvedPath} not exists`);
}

export const pluginEntry = (context: any): Plugin => {
    return {
        name: 'virtual-entry',
        setup(build) {
            build.onResolve({ filter: /^<stdin>$/ }, () => {
                return {
                    path: context?.options?.input ?? 'project/src/index.tsx',
                    namespace: namespace,
                    pluginData: {
                        importer: '',
                    },
                };
            });
        },
    };
};

export const pluginEntryInstanse = (context: any, instanseName: string): Plugin => {
    return {
        name: 'virtual-entry',
        setup(build) {
            build.onResolve({ filter: /^<instanse>$/ }, () => {
                return {
                    path: context?.options?.input ?? `project/src/containers/${instanseName}/index.ts`,
                    namespace: namespace,
                    pluginData: {
                        importer: '',
                    },
                };
            });
        },
    };
};

export const pluginGlobalExternal = (): Plugin => {
    return {
        name: 'plugin-global-external',
        setup(build) {

            build.onResolve({ filter: /.*/ }, (args) => {
                if (['react', 'react-dom', 'react-router', 'react-router-dom', 'vienna-ui'].includes(args.path)) {
                    return {
                        path: args.path,
                        namespace: 'external',
                    };
                }
            });

            build.onLoad({ filter: /.*/, namespace: 'external' }, async (args) => {
                if (args.path === 'react') {
                    return {
                        contents: `module.exports = window.React;`,
                    };
                }
                if (args.path === 'react-dom') {
                    return {
                        contents: `module.exports = window.ReactDOM;`,
                    };
                };
                if (args.path === 'react-router') {
                    return {
                        contents: `module.exports = window.ReactRouter;`,
                    };
                };
                if (args.path === 'react-router-dom') {
                    return {
                        contents: `module.exports = window.ReactRouterDOM;`,
                    };
                };
                if (args.path === 'vienna-ui') {
                    return {
                        contents: `module.exports = window.ViennaUI;`,
                    };
                };
            });

        },
    };
};

export const pluginMemfs = (context: any): Plugin => {
    return {
        name: 'memfs-plugin',
        setup(build) {

            build.onResolve({ filter: /.*/, namespace: namespace }, (args) => {
                return {
                    path: args.path,
                    pluginData: args.pluginData,
                    namespace: namespace,
                };
            });

            build.onLoad({ filter: /.*/, namespace: namespace }, async (args) => {
                let realPath = args.path;
                const resolvePath = resolve({
                    id: args.path,
                    importer: args.pluginData.importer
                });
                if (!resolvePath) {
                    throw new Error('not found');
                }
                realPath = resolvePath;
                const content = (await readFileAsync(realPath)).toString();
                return {
                    contents: content,
                    pluginData: {
                        importer: realPath,
                    },
                    loader: path.extname(realPath).slice(1) as 'js',
                };
            });

        },
    };
}