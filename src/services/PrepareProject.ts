import path from 'path';
import { FS } from ".";
import { IComponent } from "../interfaces";
import { instanse, store } from '../store/store';
import { camelToKebab } from '../utils/camelToKebab';
import { capitalizeString } from "../utils/capitalizeString";
import { Importer, styleFormatter } from '../utils/styleFormatter';
import { updateMetaAndExistItems } from './Core';
interface IImports {
    [key: string]: IComponent
}

interface ISlots {
    [key: string]: string
}

const asNoneValues = ['none', 'normal', 'unset', 'auto'];

const objToCSS = (obj: any, imports: Importer[]): [string, Importer[]] => {
    const code = Object.entries(obj ?? {})
        .map((entry: any) => {
            if (!entry[1] || asNoneValues.includes(entry[1])) {
                return false;
            }
            return `    ${camelToKebab(entry[0])}: ${entry[1]};`;
        })
        .filter(Boolean)
        .join('\n');
    return [code, imports]
}

const contentBuilder = (code: string, item: IComponent): [string, boolean, string | null] => {
    const textValue = item?.props?.$text?.value;
    if (textValue) {
        if (textValue === '$children') {
            return [`{children}`, true, null];
        }
        if (textValue.includes('$slot:')) {
            const slotName = textValue.replace(/.*\:/gm, '');
            return [`{${slotName}}`, false, slotName];
        }
        return [textValue, false, null];
    }
    return [code, false, null];
}

const getCode = (item: IComponent, structure: IComponent[]): [IImports[], string, ISlots[], ISlots[], boolean, string[]] => {

    const imports: IImports[] = [];
    const slots: ISlots[] = [];
    const forwardSlots: ISlots[] = [];
    let hasChildren: boolean = false;
    const customSlotNames: string[] = [];

    let code = '';

    structure
        .filter(child => child.parentId === item.id)
        .forEach(child => {
            const [_imports, _code, _slots, _forwardSolts, _hasChildren, _customSolotNames] = getCode(child, structure);
            hasChildren = hasChildren || _hasChildren;

            if (child.isSlot) {
                imports.push(..._imports);
                forwardSlots.push({ [`${child.name}_${child.id}`]: _code });
                slots.push({ [`${child.name}_${child.id}`]: _code }, ..._slots);
            }
            else {
                imports.push({ [child.namespace]: child }, ..._imports);
                slots.push(..._slots);
                const [content, hasChild, slotName] = contentBuilder(_code, child);

                hasChildren = hasChildren || hasChild;

                customSlotNames.push(slotName ?? '', ..._customSolotNames);

                const componentName = child.styled ? `${capitalizeString(child.name)}_${child.id}` : child.name;

                code += `<${componentName} id='${child.id}' ${constructProps(child.props)} ${constructSlotsProps(_forwardSolts)}${content ? ` >${content}</${componentName}>` : ' />'}`
            }

        });

    return [imports, code, slots, forwardSlots, hasChildren, customSlotNames];
}

const constructImports = (container: IComponent, imports: IImports[]): string => {
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
                const containerFolder = store.fileSystem.find(folder => folder.id === container.folderId);
                const importItem = store.project.structure.find(item => item.name === child);
                const importFolder = store.fileSystem.find(folder => folder.id === importItem?.folderId);
                const relative = path.relative(`${containerFolder?.path}/${containerFolder?.name}`, `${importFolder?.path}/${importFolder?.name}`);
                result.push(`import {${child}} from '${relative}/${child}.tsx'`);
            })
        }

    })

    return result.length ? result.join('\n') : '';
}

const constructStyledImports = (container: IComponent, imports: IImports[]): string => {

    const components = imports.map(imp => {
        const child = Object.values(imp)[0];

        if (child.styled) {
            return `${capitalizeString(child.name)}_${child.id}`;
        }

        return null;

    }).filter(c => c);
    if (container.styled) components.unshift('Box');

    return components.length && `import { ${components.join(',')} } from './${container.name}.styled.tsx';` || '';
};

const constructStyled = (container: IComponent, imports: IImports[]): [string, string] => {

    const constants: Importer[] = [];

    const components = imports.map<[string, IComponent]>(imp => {
        const child = Object.values(imp)[0];

        if (child.styled) {
            return [`${capitalizeString(child.name)}_${child.id}`, child];
        }

        return null as any;

    }).filter(c => c);
    if (container.styled) components.unshift(['Box', container]);


    const codeBlock = components.reduce((result, [name, component]) => {
        const [cssString, imps] = objToCSS(...styleFormatter(component.style, false));
        result += `export const ${name} = styled.div\`\n${cssString}\`;`;
        constants.push(...imps);
        return result;
    }, '') as string;

    const containerFolder = store.fileSystem.find(folder => folder.id === container.folderId);

    const constatnsString = constants.reduce((result, item: Importer) => {
        result += `import ${item.importName} from '${path.relative(`${containerFolder?.path}/${containerFolder?.name}`, `${item.file.path}/${item.file.name}`)}';`
        return result;
    }, '');

    return [codeBlock, constatnsString];

};

const wrapCode = (container: IComponent, code: string): string => {

    if (container.styled) {
        return `<Box {...attrs}>${code}</Box>`
    }

    return `<>${code}</>`;

};

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

instanse.subscribe('update', async (e) => {
    const { structure, name } = e.detail.store.project;

    if (name) {
        const layers = structure.filter(item => item.namespace === 'layer');

        layers.forEach(layer => {
            const path = `/${name}/src/${layer.type}s/${layer.name}`;
            if (!FS.existsSync(path)) {
                return;
            }

            let data = FS.readFileSync(`/${path}/${layer.name}.tsx`, 'utf-8');

            const [imports, code, slots, _, hasChildren, customSlotsNames] = getCode(layer, structure);

            updateMetaAndExistItems(layer, hasChildren, customSlotsNames);

            data = data.replace(/(\/\/ \[\[imports:start\]\]).*(\/\/ \[\[imports:end\]\])/gms, `$1\n${constructImports(layer, imports)}\n$2`);
            data = data.replace(/(\/\/ \[\[styled:start\]\]).*(\/\/ \[\[styled:end\]\])/gms, `$1\n${constructStyledImports(layer, imports)}\n$2`);
            data = data.replace(/(\/\/ \[\[slots:start\]\]).*(\/\/ \[\[slots:end\]\])/gms, `$1\n${constructSlots(slots)}\n$2`);
            data = data.replace(/(\/\/ \[\[code:start\]\]).*(\/\/ \[\[code:end\]\])/gms, `$1\n${wrapCode(layer, code)}\n$2`);

            FS.writeFileSync(`${path}/${layer.name}.tsx`, data);

            const hasStyled = true;

            if (hasStyled) {

                data = FS.readFileSync(`/${path}/${layer.name}.styled.tsx`, 'utf-8');

                const [styledCssBlock, styledImportsBlock] = constructStyled(layer, imports);

                data = data.replace(/(\/\/ \[\[styled:imports\]\]).*(\/\/ \[\[styled:imports\]\])/gms, `$1\n${styledImportsBlock}\n$2`);
                data = data.replace(/(\/\/ \[\[styled:start\]\]).*(\/\/ \[\[styled:end\]\])/gms, `$1\n${styledCssBlock}\n$2`);

                FS.writeFileSync(`${path}/${layer.name}.styled.tsx`, data);

            }
        });
    }

});