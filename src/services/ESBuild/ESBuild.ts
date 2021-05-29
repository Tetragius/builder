import { IInstanseType } from "../../interfaces/IINstanseType";
import { esBuildConfig, esBuildConfigInstanse, esBuildConfigExternal } from "./ESBuildConfig";

const esbuild = require('esbuild-wasm');

interface IESService {
    build(): Promise<void>;
    buildInstanse(instanseType: IInstanseType, instanseName: string): Promise<void>;
    buildExternal(libName: string): Promise<void>;
}

//@ts-ignore
const ESService: IESService = { build: null, buildInstanse: null, buildExternal: null };

esbuild.initialize({ wasmURL: 'esbuild.wasm' }).then(() => {
    ESService.build = async () => {
        const data = await esbuild.build(esBuildConfig());
        data.outputFiles?.forEach((file: any) => {
            const _file = new File([file.text], `index.js`, { type: 'text/javascript' });
            const url = URL.createObjectURL(_file);
            localStorage.setItem('script', url);
        });
    }
    ESService.buildInstanse = async (instanseType: IInstanseType, instanseName: string) => {
        const data = await esbuild.build(esBuildConfigInstanse(instanseType, instanseName));
        data.outputFiles?.forEach((file: any) => {
            const _file = new File([file.text], `${instanseName}.js`, { type: 'text/javascript' });
            const url = URL.createObjectURL(_file);
            localStorage.setItem(`script:instanse:${instanseName}`, url);
        });
    }
    ESService.buildExternal = async (libName: string) => {
        const data = await esbuild.build(esBuildConfigExternal(libName));
        data.outputFiles?.forEach((file: any) => {
            const _file = new File([file.text], `${libName}.js`, { type: 'text/javascript' });
            const url = URL.createObjectURL(_file);
            localStorage.setItem(`script:external:${libName}`, url);
        });
    }
});

export default ESService;