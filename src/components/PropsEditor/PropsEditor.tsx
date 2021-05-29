import React, { useCallback, useState } from 'react';
import { Box } from './PropsEditor.styles';
import { Button, FormField, Groups, Input, Select, Switcher } from 'vienna-ui';
import { store, useRaxy } from '../../store/store';
import { IComponent } from '../../interfaces';
import ESService from '../../services/ESBuild/ESBuild';
import { removeElement, removeLayer } from '../../services/Core';
import { downlload } from '../../utils/donload';
import { FS } from '../../services';
import useControlledInputOnChangeCursorFix from '../../utils/useControlledInputOnChangeCursorFix ';


export const PropsEditor = () => {

    const { state: { selected } } = useRaxy(store => {
        return {
            selected: store.project.selected as IComponent,
        }
    });

    const [building, setBuildng] = useState(false);

    const props = selected?.props;
    const keys = Object.keys(props ?? {});

    const handleOnChange = useControlledInputOnChangeCursorFix(
        useCallback((e, data) => {
            if (props) {
                props[data.name].value = data.value;
            }
        }, [props]),
    )

    const constructProp = (key: string) => {
        if (!props) { return null; }

        const prop = props[key];

        if (!prop) { return null; }

        if (key === "$text") {
            return <FormField key={key} style={{ width: '100%' }}>
                <FormField.Label>text</FormField.Label>
                <FormField.Content>
                    <Select
                        size='xs'
                        name={key}
                        editable
                        options={['$children']}
                        value={prop.value}
                        onSelect={(e, data) => prop.value = data.value}
                        onChange={handleOnChange} />
                </FormField.Content>
            </FormField>
        }

        if (key === "$id") {
            return <FormField key={key} style={{ width: '100%' }}>
                <FormField.Label>id</FormField.Label>
                <FormField.Content>
                    <Input size='xs' name={key} placeholder={selected.id} value={prop.value} onChange={handleOnChange} />
                </FormField.Content>
            </FormField>
        }

        if (key === "$name") {
            return <FormField key={key} style={{ width: '100%' }}>
                <FormField.Label>id</FormField.Label>
                <FormField.Content>
                    <Input size='xs' name={key} value={prop.value} onChange={handleOnChange} />
                </FormField.Content>
            </FormField>
        }

        if (!prop.values) {
            return <FormField key={key} style={{ width: '100%' }}>
                <FormField.Label>{key}</FormField.Label>
                <FormField.Content>
                    <Input size='xs' name={key} value={prop.value} onChange={handleOnChange} />
                </FormField.Content>
            </FormField>
        }

        if (prop.values.length === 2 && typeof prop.values[0] === 'boolean') {
            return <Switcher key={key} onChange={(e, data) => prop.value = data.value} checked={prop.value}>{key}</Switcher>
        }

        return <FormField key={key} style={{ width: '100%' }}>
            <FormField.Label>{key}</FormField.Label>
            <FormField.Content>
                <Select size='xs' options={prop.values} value={prop.value} onSelect={(e, data) => prop.value = data.value} />
            </FormField.Content>
        </FormField>

    }

    const run = async () => {
        setBuildng(true);
        await ESService.build();
        setBuildng(false);
        window.open('/playground/index.html', 'blank');
    }

    const save = () => {
        const savedState = {
            fileSystem: store.fileSystem,
            vol: FS.getVol(),
            project: store.project
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
            {keys.map(constructProp)}
            {selected.namespace === 'root' && <Button design="accent" style={{ width: '100%' }} loading={building} onClick={run}>Запусить</Button>}
            {(selected.namespace === 'layer' || selected.namespace === 'root') && <Button design="accent" style={{ width: '100%' }} loading={building} onClick={build}>Собрать</Button>}
            {selected.namespace === 'root' && <Button design="primary" style={{ width: '100%' }} onClick={save}>Сохранить</Button>}
            {selected.namespace !== 'root' && <Button design="critical" style={{ width: '100%' }} onClick={remove}>Удалить</Button>}
        </Groups>
    </Box>
}