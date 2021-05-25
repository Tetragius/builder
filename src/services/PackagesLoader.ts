import { uniqueId } from "../frame/services";
import path from 'path';
import { mkdirSyncReqFoeFile, readFileAsync, writeFileAsync } from "."
import { store } from "../store/store";
import { untgz } from "../utils/tar";

interface IDep {
    name: string;
    version: string;
    url: string;
    blob?: Blob;
}

interface IFile {
    name: string;
    buffer: ArrayBuffer;
}

const defaultRegestry = 'https://registry.npmjs.org';
const workRegestry = 'https://registry.npmjs.cf';
const nmPath = () => `/${store.project.name}/node_modules`;

export const downloadDepTarball = async (item: IDep): Promise<IDep> => {
    return { ...item, blob: await (await fetch(item.url.replace(defaultRegestry, workRegestry))).blob() };
}

export const downloadDepJson = async (url: string): Promise<any> => {
    return await (await fetch(url)).json();
}

export const getDepUrl = (name: string, version: string) => {
    return `${workRegestry}/${name}/${version.replace(/\^|~|>|<|=| /gm, '')}`;
}

export const getDependencies = async (json: any): Promise<IDep[]> => {

    if (json?.name?.includes('gulp')) {
        return [];
    }

    const dependencies = json.dependencies;

    if (dependencies) {
        const dependenciesJson = await Promise.all(
            Object.entries<string>(dependencies)
                .map(entry => getDepUrl(...entry))
                .map(downloadDepJson));

        const nestedDependenciesJson = await Promise.all(dependenciesJson.map(getDependencies))
        const flat = nestedDependenciesJson.reduce((o, i) => (o.push(...i), o), []);
        return [...dependenciesJson.map(d => ({ name: d.name, version: d.version, url: d.dist.tarball })), ...flat];
    }

    return [];
}

export const loadPackages = async (jsonPath?: string) => {
    const jsonFile = await readFileAsync(jsonPath ?? `${store.project.name}/package.json`);
    const json = JSON.parse(jsonFile);
    const dependencies = await getDependencies(json);

    const uniqDependencies = dependencies
        .reduce<IDep[]>((o, i) => (o.findIndex(it => it.name === i.name) < 0 ? o.push(i) : null, o), []);

    const tarballs = await Promise.all(uniqDependencies.map(downloadDepTarball));

    const nmDir = store.fileSystem.find(file => file.path === nmPath());
    if (!nmDir) {
        store.fileSystem.push({ id: uniqueId(), path: `/${store.project.name}`, name: 'node_modules', isFolder: true, editable: false, isOpen: false });
    }

    Promise.all(tarballs.map(async tarball => {
        const unziped = await untgz(tarball.blob);

        Promise.all(unziped.map(async (file: IFile) => {
            const filePath = file.name.replace('package', `${nmPath()}/${tarball.name}`);
            mkdirSyncReqFoeFile(filePath);
            writeFileAsync(filePath, new Uint8Array(file.buffer));

            const dirName = path.dirname(filePath);
            dirName
                .split('/')
                .forEach((name, idx, array) => {
                    const dirPath = array.slice(0, idx).join('/');
                    const exists = store.fileSystem.find(file => file.path === dirPath && file.name === name);
                    if (!exists) {
                        store.fileSystem.push({ id: uniqueId(), name, isFolder: true, path: dirPath, editable: false, isOpen: false });
                    }
                })

            const name = path.basename(filePath);

            if (name === 'LICENSE' || /.*\..*$/gm.test(name)) {
                store.fileSystem.push({ id: uniqueId(), name, isFolder: false, path: dirName, editable: false, isOpen: false });
            }


        }));

    }));
}