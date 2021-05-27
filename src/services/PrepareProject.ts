import { FS } from ".";
import { IComponent } from "../interfaces";
import { instanse } from '../store/store';
import { capitalizeString } from "../utils/capitalizeString";

interface IImports {
    [key: string]: IComponent
}

interface ISlots {
    [key: string]: string
}

const camelToKebab = (str: string): string => str.replace(/([a-z])([A-Z])/gm, '$1-$2').toLowerCase();

const styleArr = ['left', 'top', 'width', 'height'];
const formatEntry = (entry: [string, string]) => {
    if (styleArr.includes(entry[0])) {
        return `${(parseInt(entry[1]) || 0)}px`;
    }
    return entry[1];
}

const objToCSS = (obj: { [x: string]: string }): string => Object.entries(obj ?? {})
    .map(entry => !!entry[1] && `${camelToKebab(entry[0])}: ${formatEntry(entry)};`)
    .filter(Boolean)
    .join('\n');

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

                const componentName = child.styled ? `${capitalizeString(child.name)}_${child.id}` : child.name;

                code += `<${componentName} id='${child.id}' ${constructProps(child.props)} ${constructSlotsProps(_forwardSolts)}${content ? ` >${content}</${componentName}>` : ' />'}`
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

const constructStyledImports = (container: IComponent, imports: IImports[]): string => {

    const components = imports.map(imp => {
        const child = Object.values(imp)[0];

        if (child.styled) {
            return `${capitalizeString(child.name)}_${child.id}`;
        }

        return null;

    }).filter(c => c);
    if (container.styled) components.unshift('Box');

    return `import { ${components.join(',')} } from './${container.name}.styled.tsx';`;
};

const constructStyled = (container: IComponent, imports: IImports[]): string => {

    const components = imports.map<[string, IComponent]>(imp => {
        const child = Object.values(imp)[0];

        if (child.styled) {
            return [`${capitalizeString(child.name)}_${child.id}`, child];
        }

        return null as any;

    }).filter(c => c);
    if (container.styled) components.unshift(['Box', container]);

    return components.reduce((result, [name, component]) => {
        result += `export const ${name} = styled.div\`\n${objToCSS(component.style)}\`;`;
        return result;
    }, '') as string;

};

const wrapCode = (container: IComponent, code: string): string => {

    if (container.styled) {
        return `<Box>${code}</Box>`
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

            const [imports, code, slots] = getCode(layer, structure);

            data = data.replace(/(\/\/ \[\[imports:start\]\]).*(\/\/ \[\[imports:end\]\])/gms, `$1\n${constructImports(imports)}\n$2`);
            data = data.replace(/(\/\/ \[\[styled:start\]\]).*(\/\/ \[\[styled:end\]\])/gms, `$1\n${constructStyledImports(layer, imports)}\n$2`);
            data = data.replace(/(\/\/ \[\[slots:start\]\]).*(\/\/ \[\[slots:end\]\])/gms, `$1\n${constructSlots(slots)}\n$2`);
            data = data.replace(/(\/\/ \[\[code:start\]\]).*(\/\/ \[\[code:end\]\])/gms, `$1\n${wrapCode(layer, code)}\n$2`);

            FS.writeFileSync(`${path}/${layer.name}.tsx`, data);

            const hasStyled = true;

            if (hasStyled) {

                data = FS.readFileSync(`/${path}/${layer.name}.styled.tsx`, 'utf-8');

                data = data.replace(/(\/\/ \[\[styled:start\]\]).*(\/\/ \[\[styled:end\]\])/gms, `$1\n${constructStyled(layer, imports)}\n$2`);

                FS.writeFileSync(`${path}/${layer.name}.styled.tsx`, data);

            }
        });
    }

});