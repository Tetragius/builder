import { frameRaxyInstanse } from "../store/store";

const getRemIdxs = (item) => frameRaxyInstanse.store.project.structure
    .map((i, idx) => i.id === item.id ? [idx] : i.parentId === item.id ? getRemIdxs(i) : null)
    .filter(Array.isArray)
    .reduce((o, i) => (o.push(...i), o), []);


export const removeElement = (item) => {
    const remIdxs = getRemIdxs(item);

    remIdxs.sort((a, b) => b - a).forEach(idx => {
        frameRaxyInstanse.store.project.structure.splice(idx, 1);
    });
}