//@ts-nocheck
import React, { useCallback, useState } from 'react';
import { Box } from './PropsEditor.styles';
import { Button, FormField, Groups, Input, Select, Switcher } from 'vienna-ui';
import { store, useRaxy } from '../../store/store';
import { IComponent, IMetaItemProps } from '../../interfaces';
import ESService from '../../services/ESBuild/ESBuild';
import { removeElement, removeLayer } from '../../services/Core';
import { downlload } from '../../utils/donload';
import { FS } from '../../services';

const Field = ({ name, selected }) => {

    const { store, state: { prop, value, projectName }, updateState } = useRaxy(store => ({
        prop: selected.props[name],
        value: selected.props[name]?.value,
        projectName: store.project.name
    }));

    const handleOnChange = useCallback((e, data) => {
        updateState('value', data.value, () => prop.value = data.value);
    }, [prop])

    if (name === "$text") {
        return <FormField style={{ width: '100%' }}>
            <FormField.Label>text</FormField.Label>
            <FormField.Content>
                <Input size='xs' value={value} onChange={handleOnChange} />
            </FormField.Content>
        </FormField>
    }

    if (name === "$id") {
        return <FormField style={{ width: '100%' }}>
            <FormField.Label>id</FormField.Label>
            <FormField.Content>
                <Input size='xs' value={value} onChange={handleOnChange} />
            </FormField.Content>
        </FormField>
    }

    if (name === "$name") {
        return <FormField style={{ width: '100%' }}>
            <FormField.Label>id</FormField.Label>
            <FormField.Content>
                <Input size='xs' value={value} onChange={handleOnChange} />
            </FormField.Content>
        </FormField>
    }

    if (prop?.allowAssetsUrl) {

        const images = FS.getFilesPathFromFolder(`${projectName}/assets`).map(path => ({ path, name: path.split('/').pop() }));

        return <FormField style={{ width: '100%' }}>
            <FormField.Label>{name}</FormField.Label>
            <FormField.Content>
                <Select
                    size='xs'
                    options={images}
                    value={value}
                    valueToString={(item) => item.name}
                    onSelect={(e, data) => prop.value = data.value} />
            </FormField.Content>
        </FormField>
    }

    if (!prop?.values) {
        return <FormField style={{ width: '100%' }}>
            <FormField.Label>{name}</FormField.Label>
            <FormField.Content>
                <Input size='xs' value={value} onChange={handleOnChange} />
            </FormField.Content>
        </FormField>
    }

    if (prop.values.length === 2 && typeof prop.values[0] === 'boolean') {
        return <Switcher onChange={(e, data) => prop.value = data.value} checked={prop.value}>{name}</Switcher>
    }

    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{name}</FormField.Label>
        <FormField.Content>
            <Select size='xs' options={prop.values} value={prop.value} onSelect={(e, data) => prop.value = data.value} />
        </FormField.Content>
    </FormField>
}


export const PropsEditor = () => {

    const { state: { selected } } = useRaxy(store => {
        return {
            selected: store.project.selected as IComponent,
        }
    });

    const [building, setBuildng] = useState(false);

    const props = selected?.props;
    const keys = Object.keys(props ?? {});

    const run = async () => {
        setBuildng(true);
        await ESService.build();
        setBuildng(false);
        window.open('/playground/index.html', 'blank');
    }

    const save = () => {

        const savedMeta = Object.entries(store.meta).reduce((result, entry) => {
            const [key, meta] = entry;
            if (meta.namespace === 'custom') {
                result[key] = meta;
            }
            return result;
        }, {});

        const savedState = {
            vol: FS.getVol(),
            project: store.project,
            meta: savedMeta
        }

        downlload(JSON.stringify(savedState), `${store.project.name}.json`, 'application/json')
    }

    const build = async () => {
        if (selected.namespace === 'root') {
            setBuildng(true);
            await ESService.build();
            setBuildng(false);
        }
        if (selected.namespace === 'layer') {
            setBuildng(true);
            //@ts-ignore
            await ESService.buildInstanse(selected.type, selected.name);
            setBuildng(false);
        }
    }

    const remove = () => {
        if (selected.namespace === 'layer') {
            removeLayer(selected);
        }
        else {
            removeElement(selected);
        }
    }

    return <Box>
        <Groups design="vertical" >
            {keys.map(subKey => <Field key={`${selected.id}_${subKey}`} name={subKey} selected={selected} />)}
            {selected.namespace === 'root' && <Button design="accent" style={{ width: '100%' }} loading={building} onClick={run}>Запусить</Button>}
            {(selected.namespace === 'layer' || selected.namespace === 'root') && <Button design="accent" style={{ width: '100%' }} loading={building} onClick={build}>Собрать</Button>}
            {selected.namespace === 'root' && <Button design="primary" style={{ width: '100%' }} onClick={save}>Сохранить</Button>}
            {selected.namespace !== 'root' && <Button design="critical" style={{ width: '100%' }} onClick={remove}>Удалить</Button>}
        </Groups>
    </Box>
}