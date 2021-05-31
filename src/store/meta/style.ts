interface IFilter {
    blur: any;
    brightness: any;
    contrast: any;
    grayscale: any;
    hueRotate: any;
    invert: any;
    opacity: any;
    saturate: any;
    sepia: any;
    url: any;
}

interface ITransform {
    translateX: any;
    translateY: any;
    translateZ: any;
    scaleX: any;
    scaleY: any;
    scaleZ: any;
    skewX: any;
    skewY: any;
    skewZ: any;
    rotateX: any;
    rotateY: any;
    rotateZ: any;
    perspective: any;
}

export type IStyle = {
    [key in keyof Partial<CSSStyleDeclaration>]: any;
};

export const defaultStyle: IStyle & IFilter & ITransform = {
    position: { value: 'relative', values: ['absolute', 'fixed', 'relative', 'static'], namespace: 'basic' },
    display: { value: 'block', values: ['block', 'inline', 'inline-block', 'flex', 'inline-flex'], namespace: 'basic' },
    left: { value: 0, demension: 'px', demensions: ['px', '%'], namespace: 'basic' },
    top: { value: 0, demension: 'px', demensions: ['px', '%'], namespace: 'basic' },
    height: { value: 100, demension: 'px', demensions: ['px', '%'], namespace: 'basic' },
    width: { value: 100, demension: 'px', demensions: ['px', '%'], namespace: 'basic' },
    color: { value: '', dictionaryName: 'color', namespace: 'basic' },
    cursor: { value: 'auto', values: ['auto', 'crosshair', 'default', 'e-resize', 'help', 'move', 'n-resize', 'ne-resize', 'nw-resize', 'pointer', 'progress', 's-resize', 'se-resize', 'sw-resize', 'text', 'w-resize', 'wait'], namespace: 'basic' },
    opacity: { value: '', namespace: 'basic' },
    fontSize: { value: '', demension: 'px', demensions: ['px', 'pt'], namespace: 'basic' },
    lineHeight: { value: '', demension: 'px', namespace: 'basic' },

    //padding 
    paddingLeft: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'padding' },
    paddingTop: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'padding' },
    paddingRight: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'padding' },
    paddingBottom: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'padding' },

    //margin 
    marginLeft: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'margin' },
    marginTop: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'margin' },
    marginRight: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'margin' },
    marginBottom: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'margin' },

    //oultine 
    outlineColor: { value: '', dictionaryName: 'color', namespace: 'outline' },
    outlineStyle: { value: 'none', dictionaryName: 'border', namespace: 'outline' },
    outlineWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'outline' },
    outlineOffset: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'outline' },

    //border 
    borderWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-width' },
    borderLeftWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-width' },
    borderTopWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-width' },
    borderRightWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-width' },
    borderBottomWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-width' },

    borderStyle: { value: 'none', dictionaryName: 'border', namespace: 'border-style' },
    borderLeftStyle: { value: 'none', dictionaryName: 'border', namespace: 'border-style' },
    borderTopStyle: { value: 'none', dictionaryName: 'border', namespace: 'border-style' },
    borderRightStyle: { value: 'none', dictionaryName: 'border', namespace: 'border-style' },
    borderBottomStyle: { value: 'none', dictionaryName: 'border', namespace: 'border-style' },

    borderColor: { value: '', dictionaryName: 'color', namespace: 'border-color' },
    borderLeftColor: { value: '', dictionaryName: 'color', namespace: 'border-color' },
    borderTopColor: { value: '', dictionaryName: 'color', namespace: 'border-color' },
    borderRightColor: { value: '', dictionaryName: 'color', namespace: 'border-color' },
    borderBottomColor: { value: '', dictionaryName: 'color', namespace: 'border-color' },

    borderRadius: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-radius' },
    borderTopLeftRadius: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-radius' },
    borderTopRightRadius: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-radius' },
    borderBottomLeftRadius: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-radius' },
    borderBottomRightRadius: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-radius' },

    borderImageSource: { value: '', allowAssetsUrl: true, namespace: 'border-image' },
    borderImageRepeat: { value: '', values: ['space', 'repeat', 'round', 'stretch', 'revert', 'none'], namespace: 'border-image' },
    borderImageWidth: { value: '', demension: 'px', dictionaryName: 'size', namespace: 'border-image' },
    borderImageSlice: { value: '', namespace: 'border-image' },

    //background
    backgroundColor: { value: '', dictionaryName: 'color', namespace: 'background' },
    backgroundImage: { value: '', allowAssetsUrl: true, namespace: 'background' },
    backgroundSize: { value: 'auto', values: ['auto', 'cover', 'contain', 'revert'], namespace: 'background' },
    backgroundPosition: { value: 'unset', values: ['left', 'top', 'center', 'right', 'bottom', 'revert', 'unset'], namespace: 'background' },
    backgroundRepeat: { value: 'none', values: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'none'], namespace: 'background' },

    //common
    boxShadow: { value: '', namespace: 'box' },
    boxSizing: { value: 'border-box', values: ['content-box', 'border-box', 'padding-box'], namespace: 'box' },

    alignItems: { value: 'normal', values: ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'unset', 'normal'], namespace: 'flex' },
    justifyContent: { value: 'normal', values: ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'unset', 'normal'], namespace: 'flex' },
    flexDirection: { value: 'row', values: ['row', 'column'], namespace: 'flex' },
    flexWrap: { value: '', values: ['wrap', 'nowrap', 'wrap-reverse', ''], namespace: 'flex' },

    // textOverflow: { value: '', values: ['clip', 'elipsis'] },
    // overflow: { value: 'auto', values: ['hidden', 'scroll', 'auto'] },
    // whiteSpace: { value: 'normal', values: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'] },

    //filters
    blur: { value: '', demension: 'px', unionName: 'filter', namespace: 'filters' },
    brightness: { value: '', unionName: 'filter', namespace: 'filters' },
    contrast: { value: '', demension: '%', unionName: 'filter', namespace: 'filters' },
    grayscale: { value: '', demension: '%', unionName: 'filter', namespace: 'filters' },
    hueRotate: { value: '', demension: 'deg', unionName: 'filter', namespace: 'filters' },
    invert: { value: '', demension: '%', unionName: 'filter', namespace: 'filters' },
    saturate: { value: '', demension: '%', unionName: 'filter', namespace: 'filters' },
    sepia: { value: '', demension: '%', unionName: 'filter', namespace: 'filters' },
    url: { value: '', demension: '', allowAssetsUrl: true, unionName: 'filter', namespace: 'filters' },

    //filters
    translateX: { value: '', demension: 'px', unionName: 'transform', namespace: 'transform', camelCase: true },
    translateY: { value: '', demension: 'px', unionName: 'transform', namespace: 'transform', camelCase: true },
    translateZ: { value: '', demension: 'px', unionName: 'transform', namespace: 'transform', camelCase: true },

    scaleX: { value: '', unionName: 'transform', namespace: 'transform', camelCase: true },
    scaleY: { value: '', unionName: 'transform', namespace: 'transform', camelCase: true },
    scaleZ: { value: '', unionName: 'transform', namespace: 'transform', camelCase: true },

    skewX: { value: '', demension: 'deg', unionName: 'transform', namespace: 'transform', camelCase: true },
    skewY: { value: '', demension: 'deg', unionName: 'transform', namespace: 'transform', camelCase: true },

    rotateX: { value: '', demension: 'deg', unionName: 'transform', namespace: 'transform', camelCase: true },
    rotateY: { value: '', demension: 'deg', unionName: 'transform', namespace: 'transform', camelCase: true },
    rotateZ: { value: '', demension: 'deg', unionName: 'transform', namespace: 'transform', camelCase: true },

    perspective: { value: '', demension: 'px', unionName: 'transform', namespace: 'transform', camelCase: true },
}

const color = {
    "transparent": 'transparent',
    "brand-accent": "#FEE600",
    "brand-onAccent": "#FED500",
    "brand-primary": "#2B2D33",
    "brand-onPrimary": "#000000",
    "brand-wildsand": "#F4F4F4",
    "brand-white": "#FFFFFF",
    "seattle-c01": "#FBFBFB",
    "seattle-c05": "#F8F8F8",
    "seattle-c10": "#E9EAEA",
    "seattle-c30": "#D5D5D6",
    "seattle-c60": "#AAABAD",
    "seattle-c100": "#808185",
    "seattle-c120": "#55575C",
    "seattle-c140": "#404247",
    "oslo-c10": "#E6F6F8",
    "oslo-c30": "#B3E4EB",
    "oslo-c60": "#66C9D7",
    "oslo-c100": "#00A5BC",
    "oslo-c120": "#00809C",
    "oslo-c140": "#04607D",
    "london-c40": "rgba(255, 255, 255, 0.64)",
    "london-c80": "rgba(255, 255, 255, 0.24)",
    "london-c120": "rgba(43, 45, 51, 0.24)",
    "miami-c10": "#E7F8F4",
    "miami-c30": "#CFF1E9",
    "miami-c100": "#5ED1B6",
    "c10": "#E6F4FC",
    "c30": "#CDE9FA",
    "c100": "#57B6ED",
    "sochi-c10": "#F0F0FE",
    "sochi-c30": "#E1E0FE",
    "sochi-c100": "#9A99FB",
    "tokyo-c10": "#FAEFFA",
    "tokyo-c30": "#F5DFF5",
    "tokyo-c100": "#DC94DD",
    "dubai-c10": "#FFF4E8",
    "dubai-c30": "#FEE9D1",
    "dubai-c100": "#FCB664",
    "nice-c10": "#FFEFEF",
    "nice-c30": "#FEE0E0",
    "nice-c100": "#FC9696",
    "dublin-c10": "#F2F8E7",
    "dublin-c100": "#A5D05F",
    "bern-c10": "#ECF8EB",
    "bern-c100": "#7DD27C",
    "manila-c10": "#E4F7F8",
    "manila-c100": "#4BCBD3",
    "tallin-c10": "#ECF2FF",
    "tallin-c100": "#82A9FF",
    "seoul-c10": "#F5EFFE",
    "seoul-c100": "#BE93F8",
    "havana-c10": "#FDEFF5",
    "havana-c100": "#F095BA",
    "madrid-c10": "#FEF6E1",
    "madrid-c100": "#F9C541",
    "porto-c10": "#FFF1EB",
    "porto-c100": "#FEA17A",
    "geneva-c10": "#E8F7F4",
    "geneva-c30": "#BFE9DF",
    "geneva-c60": "#52C5A9",
    "geneva-c100": "#19B28D",
    "geneva-c120": "#008E7D",
    "moscow-c10": "#FDEEEE",
    "moscow-c30": "#FACED1",
    "moscow-c60": "#F27C83",
    "moscow-c100": "#EE505A",
    "moscow-c120": "#C74952",
    "osaka-c10": "#FEF3EC",
    "osaka-c30": "#FDDAC7",
    "osaka-c60": "#FAA373",
    "osaka-c100": "#F88545",
    "osaka-c120": "#CB662F",
};

const size = {
    "auto": 'auto',
    "none": 'none',
    "s1": 4,
    "s2": 8,
    "s3": 12,
    "s4": 16,
    "s5": 20,
    "s6": 24,
    "s7": 28,
    "s8": 32,
    "s9": 36,
    "s10": 40,
    "s11": 44,
    "s12": 48,
    "s13": 52,
    "s14": 56,
    "s15": 60,
    "s16": 64
}

const border = {
    'none': 'none',
    'hidden': 'hidden',
    'dotted': 'dotted',
    'dashed': 'dashed',
    'solid': 'solid',
    'double': 'double',
    'groove': 'groove',
    'ridge': 'ridge',
    'inset': 'inset',
    'outset': 'outset',
}

export const dictionary = {
    color,
    size,
    border
}