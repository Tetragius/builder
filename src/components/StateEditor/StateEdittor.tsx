import React, { useCallback } from 'react';
import { Box, Color, SelectItem, Size } from './StateEditor.styles';
import { FormField, Groups, Input, Select, Switcher } from 'vienna-ui';
import { useRaxy } from '../../store/store';
import { IComponent } from '../../interfaces';
import useControlledInputOnChangeCursorFix from '../../utils/useControlledInputOnChangeCursorFix ';
import { dictionary } from '../../store/meta/style';

const Field = ({ name }) => {

    const { store, state: { style } } = useRaxy(store => ({
        style: (store.project.selected as IComponent).style[name],
    }));

    const handleOnChange = useControlledInputOnChangeCursorFix(
        useCallback((e, data) => {
            style.value = data.value;
        }, [style]),
    )

    if (style.allowAssetsUrl) {

        const images = store.fileSystem.filter(file => file.type === 'image');

        return <FormField style={{ width: '100%' }}>
            <FormField.Label>{name}</FormField.Label>
            <FormField.Content>
                <Select
                    size='xs'
                    options={images}
                    value={style.value}
                    valueToString={(item) => item.name}
                    onSelect={(e, data) => style.value = data?.value} />
            </FormField.Content>
        </FormField>
    }

    if (style.values) {
        return <FormField style={{ width: '100%' }}>
            <FormField.Label>{name}</FormField.Label>
            <FormField.Content>
                <FormField.Content>
                    <Select size='xs' options={style.values} value={style.value} onSelect={(e, data) => style.value = data?.value} />
                </FormField.Content>
            </FormField.Content>
        </FormField>
    }

    if (style.dictionaryName) {
        return <FormField style={{ width: '100%' }}>
            <FormField.Label>{name}</FormField.Label>
            <FormField.Content>
                <FormField.Content>
                    <Select
                        size='xs'
                        value={style.value}
                        editable
                        prefix={style.demension ?? ''}
                        onChange={(e, data) => style.value = data?.value}
                        onSelect={(e, data) => style.value = data?.value} >
                        {
                            Object.entries(dictionary[style.dictionaryName]).map(option => (
                                <Select.Option
                                    key={option[0]}
                                    value={option[1]}
                                    valueToString={() => option[0]}>
                                    <SelectItem>
                                        {style.dictionaryName === 'color' && <Color style={{ background: option[1] }} />}
                                        {style.dictionaryName === 'border' && <Color style={{ borderStyle: option[1] }} />}
                                        {style.dictionaryName === 'size' &&
                                            <Size style={{ width: `${option[1]}${style.demension}`, height: `${option[1]}${style.demension}`, borderTopLeftRadius: `${name.includes('adius') ? `${option[1]}${style.demension}` : ''}` }} />
                                        }
                                        <div>{option[0]} - {option[1]}</div>
                                    </SelectItem>
                                </Select.Option>
                            ))
                        }
                    </Select>
                </FormField.Content>
            </FormField.Content>
        </FormField>
    }

    return <FormField style={{ width: '100%' }}>
        <FormField.Label>{name}</FormField.Label>
        <FormField.Content>
            <Input
                size='xs'
                value={style.value}
                postfix={style.demension}
                onChange={handleOnChange}
            />
        </FormField.Content>
    </FormField>
}

export const StateEditor = () => {

    const { state: { selected, styled }, store } = useRaxy(store => {
        return {
            styled: (store.project.selected as IComponent).styled,
            selected: store.project.selected as IComponent,
            id: store.project.selected.id
        }
    }, { selected: { ignoreTimeStamp: true } });

    const style = selected?.style;
    const keys = Object.keys(style ?? {});

    return <Box>
        <Groups design="vertical">
            <Switcher onChange={(e, data) => store.project.selected.styled = data?.value} checked={styled}>styled</Switcher>
            {keys.map(key => <Field key={key} name={key} />)}
        </Groups>
    </Box>
}