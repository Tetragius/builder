import { esBuildConfig, esBuildConfigInstanse } from "./ESBuildConfig";

const esbuild = require('esbuild-wasm');

const ESService = { build: null, buildInstanse: null } as any;

esbuild.initialize({ wasmURL: 'esbuild.wasm' }).then(() => {
    ESService.build = async () => {
        const data = await esbuild.build(esBuildConfig);
        data.outputFiles?.forEach((file: any) => {
            const _file = new File([file.text], `index.js`, { type: 'text/javascript' });
            const url = URL.createObjectURL(_file);
            localStorage.setItem('script', url);
        });
    }
    ESService.buildInstanse = async (instanseName: string) => {
        const data = await esbuild.build(esBuildConfigInstanse(instanseName));
        data.outputFiles?.forEach((file: any) => {
            const _file = new File([file.text], `${instanseName}.js`, { type: 'text/javascript' });
            const url = URL.createObjectURL(_file);
            localStorage.setItem(`script:instanse:${instanseName}`, url);
        });
    }
});

export default ESService;