
export const capitalizeString = (str: any): string => str ? (str = str.split(''), str[0] = str[0].toUpperCase(), str.join('')) : '';
