const languages = {
    tsx: 'typescript',
    ts: 'typescript',
    js: 'javascript',
    json: 'json',
    ejs: 'html',
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    svg: 'image'
}

export const getFileTypeByPath = (path: string) => {
    const ext = path?.split('.').pop();
    return languages[ext ?? 'ts'];
}