import untar from 'js-untar';
import pako from 'pako';

export const untgz = async (blob?: Blob): Promise<any[]> => {

    if (blob) {
        const buffer = await blob.arrayBuffer();
        const ungziped: Uint8Array = pako.inflate(new Uint8Array(buffer));

        return new Promise(resolve => {
            untar(ungziped.buffer)
                .progress((extractedFile) => { })
                .then((extractedFiles) => {
                    resolve(extractedFiles);
                });
        });
    }

    return [];
}