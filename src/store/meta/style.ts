interface IFilter {
    blur: any
    brightness: any
    contrast: any
    grayscale: any
    hueRotate: any
    invert: any
    opacity: any
    saturate: any
    sepia: any
}

export type IStyle = {
    [key in keyof Partial<CSSStyleDeclaration>]: any;
};

export const defaultStyle: IStyle & IFilter = {
    position: { value: 'relative', values: ['absolute', 'fixed', 'relative', 'static'] },
    left: { value: 0, demension: 'px', demensions: ['px', '%'] },
    top: { value: 0, demension: 'px', demensions: ['px', '%'] },
    display: { value: 'block', values: ['inline', 'inline-block', 'flex', 'inline-flex'] },
    height: { value: 100, demension: 'px', demensions: ['px', '%'] },
    width: { value: 100, demension: 'px', demensions: ['px', '%'] },

    //padding 
    paddingLeft: { value: '', demension: 'px', dictionaryName: 'size' },
    paddingTop: { value: '', demension: 'px', dictionaryName: 'size' },
    paddingRight: { value: '', demension: 'px', dictionaryName: 'size' },
    paddingBottom: { value: '', demension: 'px', dictionaryName: 'size' },

    //margin 
    marginLeft: { value: '', demension: 'px', dictionaryName: 'size' },
    marginTop: { value: '', demension: 'px', dictionaryName: 'size' },
    marginRight: { value: '', demension: 'px', dictionaryName: 'size' },
    marginBottom: { value: '', demension: 'px', dictionaryName: 'size' },

    //oultine 
    outlineColor: { value: '', dictionaryName: 'color' },
    outlineStyle: { value: 'none', dictionaryName: 'border' },
    outlineWidth: { value: '', demension: 'px', dictionaryName: 'size' },
    outlineOffset: { value: '', demension: 'px', dictionaryName: 'size' },

    //border 
    borderWidth: { value: '', demension: 'px', dictionaryName: 'size' },
    borderLeftWidth: { value: '', demension: 'px', dictionaryName: 'size' },
    borderTopWidth: { value: '', demension: 'px', dictionaryName: 'size' },
    borderRightWidth: { value: '', demension: 'px', dictionaryName: 'size' },
    borderBottomWidth: { value: '', demension: 'px', dictionaryName: 'size' },

    borderStyle: { value: 'none', dictionaryName: 'border' },
    borderLeftStyle: { value: 'none', dictionaryName: 'border' },
    borderTopStyle: { value: 'none', dictionaryName: 'border' },
    borderRightStyle: { value: 'none', dictionaryName: 'border' },
    borderBottomStyle: { value: 'none', dictionaryName: 'border' },

    borderColor: { value: '', dictionaryName: 'color' },
    borderLeftColor: { value: '', dictionaryName: 'color' },
    borderTopColor: { value: '', dictionaryName: 'color' },
    borderRightColor: { value: '', dictionaryName: 'color' },
    borderBottomColor: { value: '', dictionaryName: 'color' },

    borderRadius: { value: '', demension: 'px', dictionaryName: 'size' },
    borderTopLeftRadius: { value: '', demension: 'px', dictionaryName: 'size' },
    borderTopRightRadius: { value: '', demension: 'px', dictionaryName: 'size' },
    borderBottomLeftRadius: { value: '', demension: 'px', dictionaryName: 'size' },
    borderBottomRightRadius: { value: '', demension: 'px', dictionaryName: 'size' },

    //common
    boxShadow: { value: '' },
    boxSizing: { value: 'border-box', values: ['content-box', 'border-box', 'padding-box'] },
    background: { value: '', $url: false, $complex: false, dictionaryName: 'color' },
    color: { value: '', dictionaryName: 'color' },
    fontSize: { value: '', demension: 'px', demensions: ['px', 'pt'] },
    lineHeight: { value: '', demension: 'px' },
    alignItems: { value: 'normal', values: ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'unset', 'normal'] },
    justifyContent: { value: 'normal', values: ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'unset', 'normal'] },
    flexDirection: { value: 'row', values: ['row', 'column'] },
    flexWrap: { value: '', values: ['wrap', 'nowrap', 'wrap-reverse', ''] },
    cursor: { value: 'auto', values: ['auto', 'crosshair', 'default', 'e-resize', 'help', 'move', 'n-resize', 'ne-resize', 'nw-resize', 'pointer', 'progress', 's-resize', 'se-resize', 'sw-resize', 'text', 'w-resize', 'wait'] },
    opacity: { value: '' },
    // textOverflow: { value: '', values: ['clip', 'elipsis'] },
    // overflow: { value: 'auto', values: ['hidden', 'scroll', 'auto'] },
    // whiteSpace: { value: 'normal', values: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'] },

    //filters
    blur: { value: '', demension: 'px', unionName: 'filter' },
    brightness: { value: '', unionName: 'filter' },
    contrast: { value: '', demension: '%', unionName: 'filter' },
    grayscale: { value: '', demension: '%', unionName: 'filter' },
    hueRotate: { value: '', demension: 'deg', unionName: 'filter' },
    invert: { value: '', demension: '%', unionName: 'filter' },
    saturate: { value: '', demension: '%', unionName: 'filter' },
    sepia: { value: '', demension: '%', unionName: 'filter' },
}

const color = {
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