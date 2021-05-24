import { BuildOptions } from 'esbuild';
import { pluginEntry, pluginEntryInstanse, pluginGlobalExternal, pluginMemfs } from "./ESBuildPlugins";

export const esBuildConfig: BuildOptions = {
    entryPoints: ['<stdin>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    // external: ['react', 'react-dom'],
    sourcemap: 'inline',
    nodePaths: ['project/node_modules'],
    tsconfig: 'project/tsconfig.json',
    absWorkingDir: '/project',
    plugins: [pluginEntry(this), pluginGlobalExternal(), pluginMemfs(this)],
    write: false
}


export const esBuildConfigInstanse = (instanseName: string): BuildOptions => ({
    entryPoints: ['<instanse>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    external: ['react', 'react-dom', 'vienna-ui', 'styled-components'],
    format: 'esm',
    platform: 'browser',
    nodePaths: ['project/node_modules'],
    tsconfig: 'project/tsconfig.json',
    absWorkingDir: '/project',
    plugins: [pluginEntryInstanse(this, instanseName), pluginGlobalExternal(), pluginMemfs(this)],
    write: false
})