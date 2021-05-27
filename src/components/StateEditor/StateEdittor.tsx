import React, { useRef } from 'react';
import { Box } from './StateEditor.styles';
import { FormField, Groups, Input, Switcher } from 'vienna-ui';
import { useRaxy } from '../../store/store';
import { IComponent } from '../../interfaces';

const Field = ({ style, name }) => {

    const { state: { value } } = useRaxy(store => ({
        value: style[name]
    }));

    const cursor = useRef();

    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{name}</FormField.Label>
        <FormField.Content>
            <Input
                ref={input => input && (input.selectionStart = input.selectionEnd = cursor.current)}
                size='xs'
                value={value}
                onChange={(e, data) => { cursor.current = e.target.selectionStart; style[name] = data.value }}
            />
        </FormField.Content>
    </FormField>
}

export const StateEditor = () => {

    const { state: { selected, styled }, store } = useRaxy(store => {
        return {
            styled: (store.project.selected as IComponent).styled,
            selected: store.project.selected as IComponent,
        }
    }, { selected: { ignoreTimeStamp: true } });

    const style = selected?.style;
    const keys = Object.keys(style ?? {});

    return <Box>
        <Groups design="vertical">
            <Switcher onChange={(e, data) => store.project.selected.styled = data?.value} checked={styled}>styled</Switcher>
            {keys.map(key => <Field key={key} name={key} style={style} />)}
        </Groups>
    </Box>
}