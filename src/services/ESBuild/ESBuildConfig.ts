import { BuildOptions } from 'esbuild';
import { pluginEntry, pluginEntryInstanse, pluginGlobalExternal, pluginMemfs } from "./ESBuildPlugins";

export const esBuildConfig: BuildOptions = {
    entryPoints: ['<stdin>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    external: ['react', 'react-dom'],
    plugins: [pluginEntry(this), pluginGlobalExternal(), pluginMemfs(this)],
    write: false
}


export const esBuildConfigInstanse = (instanseName: string): BuildOptions => ({
    entryPoints: ['<instanse>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    external: ['react', 'react-dom'],
    format: 'esm',
    platform: 'browser',
    plugins: [pluginEntryInstanse(this, instanseName), pluginGlobalExternal(), pluginMemfs(this)],
    write: false
})