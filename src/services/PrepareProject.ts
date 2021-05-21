import { createEmptyContainer, existsSync, fsInit } from ".";
import { instanse } from '../store/store';
import ESService from "./ESBuild/ESBuild";
import { createContainer, readFileSync, writeFileSync } from "./FileSystem";

fsInit();

const getCode = (item: any, structure: any): [any, any, any, any] => {
    const imports: any[] = [];
    const slots: any[] = [];
    const forwardSlots: any[] = [];
    let code = '';

    structure
        .filter((child: any) => child.parentId === item.id)
        .forEach((child: any) => {
            const [_imports, _code, _slots, _forwardSolts] = getCode(child, structure);

            if (child.type === 'slot') {
                imports.push(..._imports);
                forwardSlots.push({ [`${child.name}_${child.id}`]: _code });
                slots.push({ [`${child.name}_${child.id}`]: _code }, ..._slots);
            }
            else {
                imports.push({ [child.type]: child }, ..._imports);
                slots.push(..._slots);
                const content = _code || (child?.props?.$text?.value ?? '');
                code += `<${child.name} id='${child.id}' ${constructProps(child.props)} ${constructSlotsProps(_forwardSolts)}${content ? ` >${content}</${child.name}>` : ' />'}`
            }

        });

    return [imports, code, slots, forwardSlots];
}

const constructImports = (imports: any[]): any[] => {
    const result = [];

    const uniqKeys = Object.keys(imports.reduce((o: any, imp: any) => (o[Object.keys(imp)[0]] = true, o), {}));

    uniqKeys.forEach(key => {
        const childs = new Set(imports.filter(imp => imp[key]).map(imp => imp[key].name.split('.')[0]));
        if (key === 'component') {
            result.push(`import {${[...childs].join(',')}} from 'vienna-ui'`);
        }
        else if (key === 'router') {
            result.push(`import {${[...childs].join(',')}} from '${imports.find(imp => imp[key])[key].namespace}'`);
        }
        else {
            result.push(`import {${key}} from '../${key}/${key}.tsx'`);
        }
    })

    return result.length ? result.join('\n') : '';
}

export const cleanProp = (prop, value) => {
    switch (true) {
        case prop.startsWith('$'):
            return '';
        case (typeof value === 'string' && !!value):
            return `${prop}='${value}'`;
        case typeof value === 'number':
            return `${prop}={${value}}`;
        case typeof value === 'boolean':
            return value ? `${prop}` : '';
        default:
            return '';
    }
}

export const constructProps = (props) => {
    const result = [];
    for (const prop in props) {
        result.push(cleanProp(prop, props[prop].value));
    }
    return result.filter(r => r).join(' ');
}

export const constructSlotsProps = (slots) => {
    const result = [];
    for (const slot of slots) {
        const key = Object.keys(slot)[0];
        const name = key.split('_')[0];
        if (slot[key])
            result.push(`${name}={${key}}`);
    }
    return result.filter(r => r).join(' ');
}


export const constructSlots = (slots) => {
    const result = [];

    const uniqKeys = Object.keys(slots.reduce((o: any, slot: any) => (o[Object.keys(slot)[0]] = true, o), {}));

    uniqKeys.forEach(key => {
        const childs = slots.filter(slot => slot[key]);
        if (childs.length === 1) {
            result.push(`const ${key} = ${childs[0][key]}`);
        }
        else if (childs.length > 1) {
            result.push(`const ${key} = <>${childs.map(child => child[key]).join('\n')}</>`);
        }
    })

    return result.length ? result.join('\n\n') : '';
}

instanse.subscribe('update', (e) => {
    const structure = e.detail.store.project.structure;
    const fs = e.detail.store.fileSystem;

    const screens = structure.filter(item => item.type === 'screen');

    screens.forEach((screen: any) => {
        const path = `project/src/containers/${screen.name}`;
        if (!existsSync(path)) {
            createEmptyContainer(screen.name);
        }

        createContainer(screen.name);
        let data = readFileSync(`${path}/${screen.name}.tsx`, 'utf-8');

        const [imports, code, slots] = getCode(screen, structure);

        data = data.replace('// [[imports]]', constructImports(imports));
        data = data.replace('{/* [[code]] */}', code);
        data = data.replace('// [[slots]]', constructSlots(slots));

        writeFileSync(`${path}/${screen.name}.tsx`, data);

        ESService.buildInstanse(screen.name);

    });

    ESService.build();
});