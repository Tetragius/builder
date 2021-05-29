import { IStyle } from "../store/meta/style";
import { camelToKebab } from "./camelToKebab";

export const styleFormatter = (styles: IStyle) => {
    const formated = {};
    for (const style in styles) {
        if (!styles[style].value || styles[style].value === 'none' || styles[style].value === 'normal') {
            continue;
        }
        if (!styles[style].unionName) {
            formated[style] = `${styles[style].value}${styles[style].demension ?? ''}`;
        }
        if (style === 'outlineWidth' && !styles[style]) {
            formated[style] = `1px`;
        }
        if (style === 'outlineColor' && !styles[style]) {
            formated[style] = `blue`;
        }
        if (style === 'outlineStyle' && !styles[style]) {
            formated[style] = `solid`;
        }
        if (styles[style].unionName) {
            if (!formated['filter']) {
                formated['filter'] = '';
            }
            formated['filter'] += styles[style].value ? `${camelToKebab(style)}(${styles[style].value}${styles[style].demension ?? ''}) ` : '';
        }
    }
    return formated;
}