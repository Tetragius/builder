const languages = {
    tsx: 'typescript',
    ts: 'typescript',
    js: 'javascript',
    json: 'json',
    ejs: 'html'
}

export const getFileType = (file) => {
    const ext = file?.name.split('.').pop();
    return languages[ext ?? 'ts'];
}