import { Plugin } from 'esbuild';
import path from 'path-browserify';
import { existsSync, readFileAsync, readFileSync } from '../FileSystem';

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
        name: 'plugin-modules',
        setup(build) {

            build.onResolve({ filter: /^([^\.\/]).*/ }, (args) => {

                const filePath = `project/node_modules/${args.path}`;
                const isJS = existsSync(`${filePath}.js`);
                const isModule = existsSync(`${filePath}/package.json`);
                const main = isModule && (JSON.parse(readFileSync(`${filePath}/package.json`, 'utf-8')).main ?? 'index.js');

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
                        path: isJS ? `${filePath}.js` : path.resolve(filePath, main),
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
                const isJS = existsSync(`${filePath}.js`);
                const isFolder = existsSync(`${filePath}/index.js`);

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

                const content = (await readFileAsync(args.path)).toString();

                return {
                    contents: content,
                    pluginData: {
                        importer: args.path,
                    },
                    loader: path.extname(args.path).slice(1) as 'js',
                };
            });

            build.onLoad({ filter: /.*/, namespace: `node_modules:external` }, async (args) => {

                const content = ` module.exports = window.__webpack_require__("./node_modules/${args.path}/index.js");`;

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