import { BuildOptions } from 'esbuild';
import { IInstanseType } from '../../interfaces/IINstanseType';
import { store } from '../../store/store';
import { pluginEntry, pluginEntryInstanse, pluginEntryExternal, pluginGlobalExternal, pluginMemfs } from "./ESBuildPlugins";

export const esBuildConfig = (): BuildOptions => ({
    entryPoints: ['<stdin>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    external: store.project.simpleLoading ? ['react', 'react-dom', 'styled-components', 'vienna-ui'] : [],
    sourcemap: 'inline',
    plugins: [pluginEntry(this), pluginGlobalExternal(), pluginMemfs(this)],
    write: false
})


export const esBuildConfigInstanse = (instanseType: IInstanseType, instanseName: string): BuildOptions => ({
    entryPoints: ['<instanse>'],
    bundle: true,
    loader: { '.tsx': 'tsx' },
    external: ['react', 'react-dom', 'styled-components', 'vienna-ui'],
    format: 'esm',
    platform: 'browser',
    plugins: [pluginEntryInstanse(this, instanseType, instanseName), pluginGlobalExternal(true), pluginMemfs(this)],
    write: false
})

export const esBuildConfigExternal = (libName: string): BuildOptions => ({
    entryPoints: ['<lib>'],
    bundle: true,
    loader: { '.jsx': 'js' },
    format: 'esm',
    platform: 'browser',
    plugins: [pluginEntryExternal(this, libName), pluginGlobalExternal(), pluginMemfs(this)],
    write: false
})