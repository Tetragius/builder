import { uniqueId } from "../frame/services";
import path from 'path';
import { mkdirSyncReqFoeFile, readFileAsync, writeFileAsync, writeFileSync } from "../services"
import { store } from "../store/store";
import { untgz } from "./tar";

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
const nmPath = 'project/node_modules';

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

export const getPackageJson = async (jsonPath = 'project/package.json') => {
    const jsonFile = await readFileAsync(jsonPath);
    const json = JSON.parse(jsonFile);
    const dependencies = await getDependencies(json);

    const uniqDependencies = dependencies
        .reduce<IDep[]>((o, i) => (o.findIndex(it => it.name === i.name) < 0 ? o.push(i) : null, o), []);

    const tarballs = await Promise.all(uniqDependencies.map(downloadDepTarball));

    const nmDir = store.fileSystem.find(file => file.path === nmPath);
    const nmDirId = nmDir?.id ?? uniqueId();
    if (!nmDir) {
        store.fileSystem.push({ id: nmDirId, parentId: '1', path: nmPath, name: 'node_modules', isFolder: true });
    }

    Promise.all(tarballs.map(async tarball => {
        const unziped = await untgz(tarball.blob);

        Promise.all(unziped.map(async (file: IFile) => {
            const filePath = file.name.replace('package', `${nmPath}/${tarball.name}`);
            mkdirSyncReqFoeFile(filePath);
            writeFileAsync(filePath, new Uint8Array(file.buffer));

            const dirName = path.dirname(filePath);
            const dirNameArr = dirName.split('/');
            dirNameArr.forEach((name, idx) => {

                const dirParentPath = dirNameArr.slice(0, idx).join('/');
                const parentId = store.fileSystem.find(file => file.path === dirParentPath)?.id;

                const dirPath = dirNameArr.slice(0, idx + 1).join('/');
                const exists = store.fileSystem.find(file => file.path === dirPath);

                if (!exists) {
                    store.fileSystem.push({ id: uniqueId(), parentId, path: dirPath, name, isFolder: true });
                }
            })

            const parentId = store.fileSystem.find(file => file.path === dirName)?.id
            const name = path.basename(filePath);

            if (name === 'LICENSE' || /.*\..*$/gm.test(name)) {
                store.fileSystem.push({ id: uniqueId(), parentId, path: filePath, name });
            }


        }));

    }));
}