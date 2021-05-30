export const blobToDataURL = async (blob: Blob): Promise<string | ArrayBuffer> => {
    return new Promise(resolve => {
        var reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => resolve(e.target?.result as any);
        reader.readAsDataURL(blob);
    })
}