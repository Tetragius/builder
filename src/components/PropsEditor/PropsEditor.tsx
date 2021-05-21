import React from 'react';
import { Box } from './PropsEditor.styles';
import { FormField, Groups, Input, Select, Switcher } from 'vienna-ui';
import { useRaxy } from '../../store/store';


export const PropsEditor = () => {

    const { state: { selected } } = useRaxy(store => {
        return {
            selected: store.project.selected,
        }
    });

    const props = selected?.props;
    const keys = Object.keys(props ?? {});

    const constructProp = (key: string) => {
        const prop = props[key];

        if (key === "$text") {
            return <FormField key={key} style={{ width: '100%' }}>
                <FormField.Label>text</FormField.Label>
                <FormField.Content>
                    <Input value={prop.value} onChange={(e, data) => { prop.value = data.value }} />
                </FormField.Content>
            </FormField>
        }

        if (!prop.values) {
            return <FormField key={key} style={{ width: '100%' }}>
                <FormField.Label>{key}</FormField.Label>
                <FormField.Content>
                    <Input value={prop.value} onChange={(e, data) => prop.value = data.value} />
                </FormField.Content>
            </FormField>
        }

        if (prop.values.length === 2 && typeof prop.values[0] === 'boolean') {
            return <Switcher key={key} onChange={(e, data) => prop.value = data.value} checked={prop.value}>{key}</Switcher>
        }

        return <FormField key={key} style={{ width: '100%' }}>
            <FormField.Label>{key}</FormField.Label>
            <FormField.Content>
                <Select options={prop.values} value={prop.value} onSelect={(e, data) => prop.value = data.value} />
            </FormField.Content>
        </FormField>

    }

    return <Box>
        <Groups design="vertical">
            {keys.map(constructProp)}
        </Groups>
    </Box>
}