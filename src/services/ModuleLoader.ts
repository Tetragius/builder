const getUrl = (instanseName: string) => {
    const code = localStorage.getItem(`script:instanse:${instanseName}`);
    const file = new File([code ?? ''], `${instanseName}.mjs`, { type: 'application/javascript' });
    return URL.createObjectURL(file);
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