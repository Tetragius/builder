export const downlload = (buffer, name, mime) => {
    const file = new File([buffer], name, { type: mime });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.setAttribute('download', name);
    document.body.appendChild(a);
    a.click();
    a.remove();
}