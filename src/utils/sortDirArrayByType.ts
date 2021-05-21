export const sortDirArrayByType = (a: any, b: any) => {
    if (a.isFolder && !b.isFolder) { return -1; }
    if (!a.isFolder && b.isFolder) { return 1; }
    return 0;
}