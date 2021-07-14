import React, { useCallback } from 'react';
import { Box, Color, SelectItem, Size, Block, BlockName } from './StateEditor.styles';
import { FormField, Groups, Input, Select, Switcher } from 'vienna-ui';
import { useRaxy } from '../../store/store';
import { IComponent } from '../../interfaces';
import { dictionary } from '../../store/meta/style';
import { sortMetaArray } from '../../utils/sortDirArrayByName';
import { FS } from '../../services';

const Field = ({ name }) => {

    const { store, state: { style, value, projectName }, updateState } = useRaxy(store => ({
        style: (store.project.selected as IComponent).style[name],
        value: (store.project.selected as IComponent).style[name]?.value,
        projectName: store.project.name
    }));

    const handleOnChange = useCallback((e, data) => {
        updateState('value', data.value, () => style.value = data.value);
    }, [style])


    if (style.allowAssetsUrl) {

        const images = FS.getFilesPathFromFolder(`${projectName}/assets`).map(path => ({ path, name: path.split('/').pop() }));

        return <FormField style={{ width: '100%' }}>
            <FormField.Label>{name}</FormField.Label>
            <FormField.Content>
                <Select
                    size='xs'
                    options={images ?? []}
                    value={value}
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
                    <Select size='xs' options={style.values} value={value} onSelect={(e, data) => style.value = data?.value} />
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
                        value={value}
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
                value={value}
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

    const styles = selected?.style;

    const entries = Object.entries(styles ?? {});

    const separate = entries.reduce((result, entry: any) => {
        const [key, style] = entry;
        const namespace = style.namespace;
        if (!result[namespace]) {
            result[namespace] = {};
        }
        result[namespace][key] = style;
        return result;
    }, {});

    const keys = Object.keys(separate);

    return <Box>
        <Groups design="vertical">
            <Switcher onChange={(e, data) => store.project.selected.styled = data?.value} checked={styled}>styled</Switcher>
            {keys.sort(sortMetaArray).map(key => {
                const subList = separate[key];
                const subListKeys = Object.keys(subList);
                return (
                    <Block key={key}>
                        <BlockName>{key}</BlockName>
                        {subListKeys.sort(sortMetaArray).map(subKey => <Field key={subKey} name={subKey} />)}
                    </Block>
                )
            })}
        </Groups>
    </Box>
}