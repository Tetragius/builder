import { IMeta } from "../../interfaces";

export const metaViennaUi: IMeta = {
    'Card': {
        namespace: 'vienna-ui',
        allowChildren: 'all',
        toolIcon: 'Card',
        resizable: 'none',
        nowrap: true,
        props: {
            $text: { value: '' },
            title: {
                value: 'Card',
            },
            stretch: { value: false, values: [true, false] }
        },
        slots: ['header', 'footer', 'actions']
    },
    'Groups': {
        namespace: 'vienna-ui',
        allowChildren: 'all',
        toolIcon: 'Groups',
        resizable: 'none',
        nowrap: true,
        props: {
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            alignItems: { value: 'center', values: ["normal", "inherit", "initial", "unset", "stretch", "center", "flex-start", "flex-end", "self-start", "self-end", "baseline"] },
            justifyContent: { value: 'flex-start', values: ["normal", "inherit", "initial", "unset", "center", "flex-start", "flex-end", "space-between", "space-around"] },
            design: { value: 'horizontal', values: ['horizontal', 'vertical'] },
            height: { value: 'auto', values: ['full', 'auto'] },
        },
    },
    'FormField': {
        namespace: 'vienna-ui',
        toolIcon: 'FormField',
        allowChildren: ['FormField.Label', 'FormField.Content', 'FormField.Message'],
        defaultChildren: ['FormField.Label', 'FormField.Content', 'FormField.Message'],
        resizable: 'none',
        nowrap: true,
    },
    'FormField.Label': {
        namespace: 'vienna-ui',
        toolIcon: 'FormField',
        allowChildren: 'string',
        resizable: 'none',
        nowrap: true,
        props: {
            $text: { value: '' },
            required: { value: false, values: [true, false] },
        },
    },
    'FormField.Content': {
        namespace: 'vienna-ui',
        toolIcon: 'FormField',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
    },
    'FormField.Message': {
        namespace: 'vienna-ui',
        toolIcon: 'FormField',
        allowChildren: 'string',
        resizable: 'none',
        nowrap: true,
        props: {
            $text: { value: '' },
            color: { value: 'normal', values: ['normal', 'warning', 'critical'] },
            align: { value: 'left', values: ['left', 'center', 'right'] },
        },
    },
    'Grid.Row': {
        namespace: 'vienna-ui',
        toolIcon: 'Grid',
        allowChildren: ['Grid.Col'],
        defaultChildren: ['Grid.Col'],
        resizable: 'none',
        nowrap: true,
        props: {
            align: { value: false, values: ['left', 'center', 'right', 'around', 'between', 'stretch', false] },
            valign: { value: false, values: ['top', 'middle', 'bottom', false] },
            columnGap: { value: '24px', values: ['0px', '2px', '4px', '8px', '16px', '24px', '32px'] },
            rowGap: { value: '0px', values: ['0px', '2px', '4px', '8px', '16px', '24px', '32px'] },
        },
    },
    'Grid.Col': {
        namespace: 'vienna-ui',
        toolIcon: 'Grid',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
        props: {
            size: { value: 'auto', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'] },
            offset: { value: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
        },
    },
    'Header': {
        namespace: 'vienna-ui',
        nowrap: true,
        toolIcon: 'Header',
        nowrap: true,
        resizable: 'none',
    },
    'Sidebar': {
        namespace: 'vienna-ui',
        toolIcon: 'Sidebar',
        nowrap: true,
        resizable: 'none',
    },
    'Button': {
        namespace: 'vienna-ui',
        allowChildren: 'all',
        toolIcon: 'Button',
        resizable: 'none',
        props: {
            $text: { value: '' },
            design: {
                value: 'accent', values: ['accent', 'primary', 'ghost', 'critical', 'outline', 'outline-critical'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            loading: { value: false, values: [true, false] },
            square: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Input': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'Input',
        resizable: 'none',
        props: {
            placeholder: {
                value: 'placeholder',
            },
            prefix: {
                value: '',
            },
            postfix: {
                value: '',
            },
            design: {
                value: 'outline', values: ['outline', 'material'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] }
        },
        slots: ['prefix', 'postfix'],
        nowrap: true,
    },
    'InputPassword': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'InputPassword',
        resizable: 'none',
        props: {
            placeholder: {
                value: 'placeholder',
            },
            prefix: {
                value: '',
            },
            postfix: {
                value: '',
            },
            design: {
                value: 'outline', values: ['outline', 'material'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'InputSlider': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'InputCard',
        resizable: 'none',
        props: {
            placeholder: {
                value: 'InputPassword',
            },
            prefix: {
                value: '',
            },
            postfix: {
                value: '',
            },
            design: {
                value: 'outline', values: ['outline', 'material'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'InputPhone': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'InputPhone',
        resizable: 'none',
        props: {
            placeholder: {
                value: 'placeholder',
            },
            prefix: {
                value: '',
            },
            postfix: {
                value: '',
            },
            design: {
                value: 'outline', values: ['outline', 'material'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Textarea': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'Textarea',
        resizable: 'none',
        props: {
            placeholder: {
                value: 'placeholder',
            },
            design: {
                value: 'outline', values: ['outline', 'material'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Radio': {
        namespace: 'vienna-ui',
        allowChildren: 'string',
        toolIcon: 'Radio',
        resizable: 'none',
        props: {
            $text: { value: '' },
            size: {
                value: 'm', values: ['l', 'm', 's'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Checkbox': {
        namespace: 'vienna-ui',
        allowChildren: 'string',
        toolIcon: 'Checkbox',
        resizable: 'none',
        props: {
            $text: { value: '' },
            size: {
                value: 'm', values: ['l', 'm', 's'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Switcher': {
        namespace: 'vienna-ui',
        allowChildren: 'string',
        toolIcon: 'Switcher',
        resizable: 'none',
        props: {
            $text: { value: '' },
            size: {
                value: 'm', values: ['l', 'm', 's'],
            },
            disabled: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Calendar': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'Calendar',
        resizable: 'none',
        nowrap: true,
    },
    'Datepicker': {
        namespace: 'vienna-ui',
        allowChildren: null,
        toolIcon: 'DatePicker',
        resizable: 'none',
        props: {
            design: {
                value: 'outline', values: ['outline', 'material'],
            },
            size: {
                value: 'm', values: ['xxl', 'xl', 'l', 'm', 's', 'xs', 'xxs'],
            },
            disabled: { value: false, values: [true, false] },
            invalid: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Select': {
        namespace: 'vienna-ui',
        allowChildren: 'all',
        toolIcon: 'Select',
        resizable: 'none',
        nowrap: true,
    },
    'Select.Option': {
        namespace: 'vienna-ui',
        allowChildren: null,
        props: {
            value: { value: '' },
            $text: { value: '' },
        },
        toolIcon: 'Select',
        resizable: 'none',
        nowrap: true,
    },
    'Tooltip': {
        namespace: 'vienna-ui',
        toolIcon: 'Tooltip',
        allowChildren: 'all',
        resizable: 'none',
        props: {
            design: { value: 'light', values: ['dark', 'light'] },
            anchor: { value: 'auto', values: ["top", "bottom", "left", "right", "center", "auto"] },
            size: {
                value: 'm', values: ['m', 's'],
            },
            width: { value: '250' },
            content: { value: 'tooltip' },
            truncate: { value: false, values: [true, false] }
        },
        nowrap: true,
    },
    'Heading': {
        namespace: 'vienna-ui',
        toolIcon: 'Typography',
        allowChildren: 'string',
        resizable: 'none',
        props: {
            $text: { value: '' },
            size: {
                value: 'm', values: ["xs", "s", "m", "l", "xl"],
            },
            margin: {
                value: 'none', values: ["xs", "s", "m", "l", "xl", "none", "xxs", "xxl"],
            },
            color: {
                value: 'brand-primary', values: ["brand-accent", "brand-white", "brand-primary", "geneva100", "moscow100", "osaka100", "seattle01", "seattle05", "seattle10", "seattle30", "seattle60", "seattle100", "seattle120", "seattle140", "currentColor"],
            },
            uppercase: { value: false, values: [true, false] }
        },
        nowrap: true,
    },
    'Text': {
        namespace: 'vienna-ui',
        toolIcon: 'Typography',
        allowChildren: 'string',
        resizable: 'none',
        props: {
            $text: { value: '' },
            size: {
                value: 'm', values: ["xs", "s", "m", "l", "xl"],
            },
            margin: {
                value: 'none', values: ["xs", "s", "m", "l", "xl", "none", "xxs", "xxl"],
            },
            color: {
                value: 'brand-primary', values: ["brand-accent", "brand-white", "brand-primary", "geneva100", "moscow100", "osaka100", "seattle01", "seattle05", "seattle10", "seattle30", "seattle60", "seattle100", "seattle120", "seattle140", "currentColor"],
            },
            uppercase: { value: false, values: [true, false] }
        },
        nowrap: true,
    },
    'Badge': {
        namespace: 'vienna-ui',
        toolIcon: 'Badge',
        allowChildren: 'all',
        resizable: 'none',
        props: {
            $text: { value: '' },
            size: {
                value: 'm', values: ["s", "m", "l"],
            },
            color: { value: 'paris10', values: ["paris10", "paris30", "miami10", "miami30", "dubai10", "dubai30", "nice10", "nice30", "seattle05", "seattle10"] }
        },
        nowrap: true,
    },
    'Spinner': {
        namespace: 'vienna-ui',
        toolIcon: 'Spinner',
        allowChildren: null,
        resizable: 'none',
        props: {
            size: {
                value: 'm', values: ["xs", "s", "m", "l", "xl", "xxl"],
            },
            position: { value: 'relative', values: ['relative', 'absolute'] }
        },
        nowrap: true,
    },
    'Progressbar': {
        namespace: 'vienna-ui',
        toolIcon: 'Progressbar',
        allowChildren: null,
        resizable: 'none',
        props: {
            size: {
                value: 'm', values: ["s", "m", "l"],
            },
            view: { value: 'line', values: ["line", "circle"] },
            color: { value: 'oslo120', values: ["accent", "moscow100", "osaka100", "geneva100", "oslo120", "seattle140", "oslo100", "miami100", "sochi100", "paris100", "tokyo100", "dubai100", "nice100"] },
            value: { value: '30' },
            loading: { value: false, values: [true, false] }
        },
        nowrap: true,
    },
    'Alert': {
        namespace: 'vienna-ui',
        toolIcon: 'Alert',
        allowChildren: 'all',
        resizable: 'none',
        props: {
            $text: { value: '' },
            design: {
                value: 'plain', values: ['plain', 'error', 'warning', 'success'],
            },
            dynamic: { value: false, values: [true, false] },
            noIcon: { value: false, values: [true, false] }
        },
        nowrap: true,
    },
    'Tabs': {
        namespace: 'vienna-ui',
        toolIcon: 'Tabs',
        allowChildren: ['Tabs.Tab'],
        defaultChildren: ['Tabs.Tab'],
        resizable: 'none',
        props: {
            design: {
                value: 'accent', values: ['accent', 'primary'],
            },
            size: {
                value: 'm', values: ["s", "m", "l"],
            },
            value: { value: '' },
            resizeble: { value: false, values: [true, false] },
        },
        nowrap: true,
    },
    'Tabs.Tab': {
        namespace: 'vienna-ui',
        toolIcon: 'Tabs',
        allowChildren: 'string',
        resizable: 'none',
        props: {
            $text: { value: '' },
            value: { value: '' },
            active: { value: false, values: [true, false] },
            disabled: { value: false, values: [true, false] }
        },
        nowrap: true,
    },
    'Modal': {
        namespace: 'vienna-ui',
        toolIcon: 'Modal',
        allowChildren: ['Modal.Layout'],
        defaultChildren: ['Modal.Layout'],
        props: {
            isOpen: { value: true, values: [true, false] },
        },
        resizable: 'none',
    },
    'Modal.Layout': {
        namespace: 'vienna-ui',
        toolIcon: 'Modal',
        allowChildren: ['Modal.Head', 'Modal.Body', 'Modal.Footer'],
        defaultChildren: ['Modal.Head', 'Modal.Body', 'Modal.Footer'],
        resizable: 'none',
        nowrap: true,
    },
    'Modal.Head': {
        namespace: 'vienna-ui',
        toolIcon: 'Modal',
        allowChildren: ['Modal.Title'],
        defaultChildren: ['Modal.Title'],
        resizable: 'none',
        nowrap: true,
    },
    'Modal.Title': {
        namespace: 'vienna-ui',
        toolIcon: 'Modal',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
        props: {
            $text: { value: '' },
        },
    },
    'Modal.Body': {
        namespace: 'vienna-ui',
        toolIcon: 'Modal',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
    },
    'Modal.Footer': {
        namespace: 'vienna-ui',
        toolIcon: 'Modal',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
    },
    'Drawer': {
        namespace: 'vienna-ui',
        toolIcon: 'Drawer',
        allowChildren: ['Drawer.Layout'],
        defaultChildren: ['Drawer.Layout'],
        props: {
            isOpen: { value: true, values: [true, false] },
        },
        resizable: 'none',
        nowrap: true,
    },
    'Drawer.Layout': {
        namespace: 'vienna-ui',
        toolIcon: 'Drawer',
        allowChildren: ['Drawer.Head', 'Drawer.Body', 'Drawer.Footer'],
        defaultChildren: ['Drawer.Head', 'Drawer.Body', 'Drawer.Footer'],
        resizable: 'none',
        nowrap: true,
    },
    'Drawer.Head': {
        namespace: 'vienna-ui',
        toolIcon: 'Drawer',
        allowChildren: ['Drawer.Title'],
        defaultChildren: ['Drawer.Title'],
        resizable: 'none',
        nowrap: true,
    },
    'Drawer.Title': {
        namespace: 'vienna-ui',
        toolIcon: 'Drawer',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
        props: {
            $text: { value: '' },
        },
    },
    'Drawer.Body': {
        namespace: 'vienna-ui',
        toolIcon: 'Drawer',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
    },
    'Drawer.Footer': {
        namespace: 'vienna-ui',
        toolIcon: 'Drawer',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
    },
    'Stepper': {
        namespace: 'vienna-ui',
        toolIcon: 'Stepper',
        allowChildren: ['Stepper.Step'],
        defaultChildren: ['Stepper.Step'],
        resizable: 'none',
        nowrap: true,
        props: {
            value: { value: '' },
            error: { value: '' },
            valign: { value: 'center', values: ['top', 'center'] },
            responsive: { value: true, values: [true, false] },
            orientation: { value: 'horizontal', values: ['horizontal', 'vertical'] },
            size: {
                value: 's', values: ["s", "l"],
            }
        },
    },
    'Stepper.Step': {
        namespace: 'vienna-ui',
        toolIcon: 'Stepper',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
        props: {
            $text: { value: '' },
            value: { value: '' },
        },
    },
    'Hint': {
        namespace: 'vienna-ui',
        toolIcon: 'Popover',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
        slots: ['header', 'content'],
        props: {
            header: { value: '' },
            $text: { value: '' },
            content: { value: '' },
            width: { value: '' },
            design: { value: 'light', values: ['dark', 'light'] },
            anchor: { value: 'auto', values: ["top", "bottom", "left", "right", "auto"] },
            size: {
                value: 'm', values: ["s", 'm', "l"],
            }
        },
    },
    'Popover': {
        namespace: 'vienna-ui',
        toolIcon: 'Popover',
        allowChildren: 'all',
        resizable: 'none',
        nowrap: true,
        props: {
            header: { value: '' },
            content: { value: '' },
            $text: { value: '' },
            width: { value: '' },
            design: { value: 'light', values: ['dark', 'light'] },
            anchor: { value: 'auto', values: ["top", "bottom", "left", "right", "auto"] },
            size: {
                value: 'm', values: ["s", 'm', "l"],
            },
            allowKeyboardEvents: { value: false, values: [true, false] },
            noScroll: { value: false, values: [true, false] },
            noClose: { value: false, values: [true, false] },
        },
    },
};

export default metaViennaUi;