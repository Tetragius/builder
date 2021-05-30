import { Plugin } from 'esbuild';
import path from 'path-browserify';
import { IInstanseType } from '../../interfaces/IINstanseType';
import { store } from '../../store/store';
import { FS } from '../FileSystem';

const namespace = 'virtual';

const resolve = ({ id, importer }: { id: string; importer: string; }) => {
    let resolvedPath = id;
    if (importer && id.startsWith('.')) {
        resolvedPath = path.resolve(path.dirname(importer), id);
    }
    for (const x of ['', '.ts', '.js', '.css']) {
        const realPath = resolvedPath + x;
        if (FS.existsSync(realPath)) {
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
                    path: context?.options?.input ?? `${store.project.name}/src/index.tsx`,
                    namespace: namespace,
                    pluginData: {
                        importer: '',
                    },
                };
            });
        },
    };
};

export const pluginEntryInstanse = (context: any, instanseType: IInstanseType, instanseName: string): Plugin => {
    return {
        name: 'virtual-entry',
        setup(build) {
            build.onResolve({ filter: /^<instanse>$/ }, () => {
                return {
                    path: context?.options?.input ?? `${store.project.name}/src/${instanseType}s/${instanseName}/index.ts`,
                    namespace: namespace,
                    pluginData: {
                        importer: '',
                    },
                };
            });
        },
    };
};

const getLibMainFile = (libName: string) => {
    const filePath = `${store.project.name}/node_modules/${libName}`;
    const isJS = FS.existsSync(`${filePath}.js`);
    const main = !isJS && (JSON.parse(FS.readFileSync(`${filePath}/package.json`, 'utf-8')).main ?? 'index.js');
    return isJS ? `${filePath}.js` : path.resolve(filePath, main);
}

export const pluginEntryExternal = (context: any, libName: string): Plugin => {
    return {
        name: 'virtual-entry',
        setup(build) {
            build.onResolve({ filter: /^<lib>$/ }, () => {
                return {
                    path: context?.options?.input ?? getLibMainFile(libName),
                    namespace: 'node_modules',
                    pluginData: {
                        importer: '',
                    },
                };
            });
        },
    };
};

export const pluginImage = (context: any): Plugin => {
    return {
        name: 'image-plugin',
        setup(build) {
            build.onResolve({ filter: /\.(png|jpe?g|svg)$/ }, (args) => {
                return {
                    path: args.path,
                    namespace: 'images',
                    pluginData: {
                        ...args.pluginData
                    },
                };
            });
            build.onLoad({ filter: /.*/, namespace: `images` }, async (args) => {

                const filePath = path.resolve(path.dirname(args.pluginData.importer), args.path)
                const content = (await FS.readFileAsync(filePath)).toString();
                
                return {
                    contents: content,
                    pluginData: {
                        importer: args.path,
                    },
                    loader: 'text',
                };
            });
        },
    };
};

const getLibMainFileWebpackRelative = (libName: string) => {
    const mask = {
        'react': './node_modules/react/index.js',
        'react-dom': './node_modules/react-dom/index.js',
        'styled-components': './node_modules/styled-components/dist/styled-components.browser.esm.js',
        'vienna-ui': './node_modules/vienna-ui/esm/index.js',
    }
    return mask[libName];
}

export const pluginGlobalExternal = (forceWebpack?: boolean): Plugin => {
    return {
        name: 'plugin-modules',
        setup(build) {

            build.onResolve({ filter: /^([^\.\/]).*/ }, (args) => {

                const filePath = `${store.project.name}/node_modules/${args.path}`;
                const isJS = FS.existsSync(`${filePath}.js`);
                const isModule = FS.existsSync(`${filePath}/package.json`);

                const external = build.initialOptions.external?.includes(args.path);

                if (external) {
                    return {
                        path: args.path,
                        namespace: `node_modules:external`,
                        pluginData: {
                            ...args.pluginData,
                            package: args.path,
                        },
                    };
                }

                if (isJS || isModule) {
                    return {
                        path: getLibMainFile(args.path),
                        namespace: `node_modules`,
                        pluginData: {
                            ...args.pluginData,
                            package: args.path,
                        },
                    };
                }
            });

            build.onResolve({ filter: /.*/, namespace: 'node_modules' }, (args) => {

                if (!/\.{1,2}\/.*(?<!\.js)$/.test(args.path)) {
                    return;
                }

                const filePath = path.resolve(path.dirname(args.importer), args.path);
                const isJS = FS.existsSync(`${filePath}.js`);
                const isFolder = FS.existsSync(`${filePath}/index.js`);

                return {
                    path: isJS ? `${filePath}.js` : isFolder ? `${filePath}/index.js` : '',
                    namespace: `node_modules`,
                    pluginData: {
                        ...args.pluginData,
                        package: args.path
                    }
                };
            });

            build.onResolve({ filter: /.*\.js$/, namespace: 'node_modules' }, (args) => {

                const filePath = path.resolve(path.dirname(args.importer), args.path);

                return {
                    path: filePath,
                    namespace: `node_modules`,
                    pluginData: {
                        ...args.pluginData,
                        package: args.path
                    }
                };
            });

            build.onLoad({ filter: /.*\.js$/, namespace: `node_modules` }, async (args) => {

                const content = (await FS.readFileAsync(args.path)).toString();

                return {
                    contents: content,
                    pluginData: {
                        importer: args.path,
                    },
                    loader: path.extname(args.path).slice(1) as 'js',
                };
            });

            build.onLoad({ filter: /.*/, namespace: `node_modules:external` }, async (args) => {

                const isSimpleLoading = store.project.simpleLoading;

                const content = !isSimpleLoading || forceWebpack ?
                    `module.exports = window.__webpack_require__("${getLibMainFileWebpackRelative(args.path)}");`
                    :
                    `module.exports = window['${args.path}'];`;

                return {
                    contents: content,
                    pluginData: {
                        importer: args.path,
                    },
                    loader: 'js',
                };
            });

        },
    };
};

export const pluginMemfs = (context: any): Plugin => {
    return {
        name: 'memfs-plugin',
        setup(build) {

            build.onResolve({ filter: /^\.{1,2}\/.*/, namespace: namespace }, (args) => {
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
                const content = (await FS.readFileAsync(realPath)).toString();
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