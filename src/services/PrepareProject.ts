import { existsSync } from ".";
import { IComponent } from "../interfaces";
import { createEmptyContainer } from "../presets/basicProjectPreset";
import { instanse } from '../store/store';
import { readFileSync, writeFileSync } from "./FileSystem";

interface IImports {
    [key: string]: IComponent
}

interface ISlots {
    [key: string]: string
}

const getCode = (item: IComponent, structure: IComponent[]): [IImports[], string, ISlots[], ISlots[]] => {
    const imports: IImports[] = [];
    const slots: ISlots[] = [];
    const forwardSlots: ISlots[] = [];
    let code = '';

    structure
        .filter(child => child.parentId === item.id)
        .forEach(child => {
            const [_imports, _code, _slots, _forwardSolts] = getCode(child, structure);

            if (child.isSlot) {
                imports.push(..._imports);
                forwardSlots.push({ [`${child.name}_${child.id}`]: _code });
                slots.push({ [`${child.name}_${child.id}`]: _code }, ..._slots);
            }
            else {
                imports.push({ [child.namespace]: child }, ..._imports);
                slots.push(..._slots);
                const content = _code || (child?.props?.$text?.value ?? '');
                code += `<${child.name} id='${child.id}' ${constructProps(child.props)} ${constructSlotsProps(_forwardSolts)}${content ? ` >${content}</${child.name}>` : ' />'}`
            }

        });

    return [imports, code, slots, forwardSlots];
}

const constructImports = (imports: IImports[]): string => {
    const result: string[] = [];

    const uniqKeys = Object.keys(imports.reduce((o: any, imp) => (o[Object.keys(imp)[0]] = true, o), {}));

    uniqKeys.forEach(key => {
        const childs = new Set(imports.filter(imp => imp[key]).map(imp => imp[key].name.split('.')[0]));
        if (key && key !== 'native' && key !== 'custom') {
            //@ts-ignore
            result.push(`import {${[...childs].join(',')}} from '${key}'`);
        }
        else if (key === 'custom') {
            childs.forEach(child => {
                result.push(`import {${child}} from '../${child}/${child}.tsx'`);
            })
        }

    })

    return result.length ? result.join('\n') : '';
}

export const cleanProp = (prop, value): string => {
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

export const constructProps = (props): string => {
    const result: string[] = [];
    for (const prop in props) {
        result.push(cleanProp(prop, props[prop].value));
    }
    return result.filter(r => r).join(' ');
}

export const constructSlotsProps = (slots): string => {
    const result: string[] = [];
    for (const slot of slots) {
        const key = Object.keys(slot)[0];
        const name = key.split('_')[0];
        if (slot[key])
            result.push(`${name}={${key}}`);
    }
    return result.filter(r => r).join(' ');
}


export const constructSlots = (slots): string => {
    const result: string[] = [];

    const uniqKeys = Object.keys(slots.reduce((o: any, slot: any) => (o[Object.keys(slot)[0]] = true, o), {}));

    uniqKeys.reverse().forEach(key => {
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
    const { structure, name } = e.detail.store.project;

    const screens = structure.filter(item => item.custom);

    screens.forEach(screen => {
        const path = `${name}/src/containers/${screen.name}`;
        if (!existsSync(path)) {
            createEmptyContainer(name, screen.name);
        }

        let data = readFileSync(`${path}/${screen.name}.tsx`, 'utf-8');

        const [imports, code, slots] = getCode(screen, structure);

        data = data.replace(/(\/\/ \[\[imports:start\]\]).*(\/\/ \[\[imports:end\]\])/gms, `$1\n${constructImports(imports)}\n$2`);
        data = data.replace(/(\/\/ \[\[slots:start\]\]).*(\/\/ \[\[slots:end\]\])/gms, `$1\n${constructSlots(slots)}\n$2`);
        data = data.replace(/(\{\/\* \[\[code:start\]\] \*\/\}).*(\{\/\* \[\[code:end\]\] \*\/\})/gms, `$1\n${code}\n$2`);

        writeFileSync(`${path}/${screen.name}.tsx`, data);

    });

});