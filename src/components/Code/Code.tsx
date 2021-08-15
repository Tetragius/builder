import React, { useEffect, useRef } from 'react';
import { Box } from './Code.styled';
import { store, useRaxy } from '../../store/store';
import { Monaco } from '../../services/Monaco';
import { FS } from '../../services';

const jscodeshift = require('jscodeshift');
const recast = require('recast');

export const Code = () => {

    const ref = useRef<HTMLDivElement>(null);
    const editor = useRef<monaco.editor.IStandaloneCodeEditor>();

    const { state: { currentFilePath } } = useRaxy(store => ({ currentFilePath: store.flags.workplace.currentFilePath }));

    useEffect(() => {

        if (ref.current && currentFilePath && FS.isFile(currentFilePath)) {

            if (editor.current) {

                editor.current.setModel(Monaco.createModel(currentFilePath));
            }
            else {

                editor.current = Monaco.createEditor(ref.current, Monaco.createModel(currentFilePath));
                editor.current.onDidChangeModelContent(e => {
                    const change = e.changes[0];
                    const value = editor.current.getModel().getValue();

                    jscodeshift(value)
                        .find(jscodeshift.JSXAttribute)
                        .filter(({ value }) => value.start < change.rangeOffset && value.end > change.rangeOffset)
                        .forEach(({ value, parent }) => {
                            const elementId = parent.value.attributes[0].value.value;
                            const element = store.project.structure.find(element => element.id === elementId);

                            const type = value.value.type;
                            const propName = value.name.name;
                            const propValue = value.value.value;
                            const propExpression = value.value.expression;

                            if (element.props[propName] && type !== 'JSXExpressionContainer') {
                                element.props[propName].value = propValue;
                            }
                            else {
                                element.props[propName] = { value: recast.print(propExpression).code, type: 'expression' };
                            }

                        });

                    jscodeshift(value)
                        .find(jscodeshift.JSXText)
                        .filter(({ value }) => value.start < change.rangeOffset && value.end > change.rangeOffset)
                        .forEach(({ value, parent }) => {
                            const elementId = parent.value.openingElement.attributes[0].value.value;
                            const element = store.project.structure.find(element => element.id === elementId);

                            const text = value.value;
                            element.props['$text'].value = text.replace(/\n/gmi, '').trim();

                        });

                    FS.writeFileSync(currentFilePath, value);

                });

                editor.current.onDidChangeCursorPosition(e => {
                    const model = editor.current.getModel();
                    const offset = model.getOffsetAt(e.position);
                    const value = editor.current.getModel().getValue();
                    jscodeshift(value)
                        .find(jscodeshift.JSXOpeningElement)
                        .filter(({ value }) => value.start < offset && value.end > offset)
                        .forEach(({ value }) => {
                            const elementId = value.attributes[0].value.value;
                            if (elementId) {
                                store.project.selected = store.project.structure.find(element => element.id === elementId);
                            }
                        });
                });
            }

        }
    }, [currentFilePath])

    return <Box ref={ref} />;

}