import { esBuildConfig, esBuildConfigInstanse } from "./ESBuildConfig";

const esbuild = require('esbuild-wasm');

const ESService = { build: null, buildInstanse: null } as any;

esbuild.initialize({ wasmURL: 'esbuild.wasm' }).then(() => {
    ESService.build = async () => {
        const data = await esbuild.build(esBuildConfig);
        data.outputFiles?.forEach((file: any) => localStorage.setItem('script', file.text));
    }
    ESService.buildInstanse = async (instanseName: string) => {
        const data = await esbuild.build(esBuildConfigInstanse(instanseName));
        data.outputFiles?.forEach((file: any) => localStorage.setItem(`script:instanse:${instanseName}`, file.text));
    }
});

window['esbuild'] = ESService;

export default ESService;