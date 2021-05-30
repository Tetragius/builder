import { BuildOptions } from 'esbuild';
import { IInstanseType } from '../../interfaces/IINstanseType';
import { store } from '../../store/store';
import { pluginEntry, pluginEntryInstanse, pluginEntryExternal, pluginGlobalExternal, pluginMemfs, pluginImage } from "./ESBuildPlugins";

export const esBuildConfig = (): BuildOptions => ({
    entryPoints: ['<stdin>'],
    bundle: true,
    loader: { '.tsx': 'tsx', '.jpg': 'dataurl', '.png': 'dataurl', '.svg': 'dataurl', '.jpeg': 'dataurl' },
    external: store.project.simpleLoading ? ['react', 'react-dom', 'styled-components', 'vienna-ui'] : [],
    sourcemap: 'inline',
    plugins: [pluginEntry(this), pluginGlobalExternal(), pluginImage(this), pluginMemfs(this)],
    write: false
})


export const esBuildConfigInstanse = (instanseType: IInstanseType, instanseName: string): BuildOptions => ({
    entryPoints: ['<instanse>'],
    bundle: true,
    loader: { '.tsx': 'tsx', '.jpg': 'dataurl', '.png': 'dataurl', '.svg': 'dataurl', '.jpeg': 'dataurl' },
    external: ['react', 'react-dom', 'styled-components', 'vienna-ui'],
    format: 'esm',
    platform: 'browser',
    plugins: [pluginEntryInstanse(this, instanseType, instanseName), pluginGlobalExternal(true), pluginImage(this), pluginMemfs(this)],
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