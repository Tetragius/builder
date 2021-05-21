export const reconstructPath = (file: any, fs: any): string => {
    const result = [];
    result.unshift(file.name);
    if (file.parentId) {
        const parent = fs.find((f: any) => f.id === file.parentId);
        result.unshift(reconstructPath(parent, fs));
    }

    return result.join('/');
}