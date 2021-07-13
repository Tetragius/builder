import { FS } from "../services";

export const sortDirArrayByType = (a: any, b: any) => {
    if (FS.isDirectory(a) && !FS.isDirectory(b)) { return -1; }
    if (!FS.isDirectory(a) && FS.isDirectory(b)) { return 1; }
    return 0;
}