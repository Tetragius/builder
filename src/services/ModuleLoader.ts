const getUrl = (instanseName: string) => {
    const url = localStorage.getItem(`script:instanse:${instanseName}`) as string;
    return url;
}

export const getCode = (instanseName: string) => {
    return localStorage.getItem(`script:instanse:${instanseName}`);
}

export const loadInstanse = (instanseName: string) => {
    const url = getUrl(instanseName);
    return import(/* webpackIgnore: true */ url)
        .then(module => module[instanseName])
        .catch(error => error);
}