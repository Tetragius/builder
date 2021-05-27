export const sortDirArrayByName = (a: any, b: any) => {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
}

export const sortMetaArray = (a: any, b: any) => {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
}