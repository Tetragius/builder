export const meta = {
  'HashRouter': {
    type: 'router',
    namespace: 'react-router-dom',
    allowChildren: 'all',
    nowrap: false,
    toolIcon: 'Body',
    resizable: 'none',
  },
  'Route': {
    type: 'router',
    namespace: 'react-router-dom',
    nowrap: false,
    toolIcon: 'Body',
    allowChildren: 'all',
    resizable: 'none',
    props: {
      path: { value: '/' }
    }
  },
  'Link': {
    type: 'router',
    namespace: 'react-router-dom',
    nowrap: true,
    toolIcon: 'Link',
    allowChildren: 'all',
    resizable: 'none',
    props: {
      to: { value: '/' }
    }
  },
  break0: true, 
  Card: {
    allowChildren: 'all',
    toolIcon: 'Card',
    resizable: 'x',
    props: {
      $text: { value: '' },
      title: {
        value: 'Card',
      },
      stretch: { value: false, values: [true, false] }
    },
    slots: ['header', 'footer', 'actions']
  },
  Groups: {
    allowChildren: 'all',
    toolIcon: 'Groups',
    resizable: 'none',
    nowrap: true,
    nowrapChildren: true,
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
  FormField: {
    toolIcon: 'FormField',
    allowChildren: ['FormField.Label', 'FormField.Content', 'FormField.Message'],
    defaultChildren: ['FormField.Label', 'FormField.Content', 'FormField.Message'],
    resizable: 'x',
    nowrapChildren: true
  },
  'FormField.Label': {
    toolIcon: 'FormField',
    allowChildren: 'string',
    resizable: 'x',
    nowrapChildren: true,
    props: {
      $text: { value: '' },
      required: { value: false, values: [true, false] },
    },
  },
  'FormField.Content': {
    toolIcon: 'FormField',
    allowChildren: 'all',
    resizable: 'x',
    nowrapChildren: true,
  },
  'FormField.Message': {
    toolIcon: 'FormField',
    allowChildren: 'string',
    resizable: 'x',
    nowrapChildren: true,
    props: {
      $text: { value: '' },
      color: { value: 'normal', values: ['normal', 'warning', 'critical'] },
      align: { value: 'left', values: ['left', 'center', 'right'] },
    },
  },
  'Grid.Row': {
    toolIcon: 'Grid',
    allowChildren: ['Grid.Col'],
    defaultChildren: ['Grid.Col'],
    resizable: 'none',
    nowrapChildren: true,
    nowrap: true,
    props: {
      align: { value: false, values: ['left', 'center', 'right', 'around', 'between', 'stretch', false] },
      valign: { value: false, values: ['top', 'middle', 'bottom', false] },
      columnGap: { value: '24px', values: ['0px', '2px', '4px', '8px', '16px', '24px', '32px'] },
      rowGap: { value: '0px', values: ['0px', '2px', '4px', '8px', '16px', '24px', '32px'] },
    },
  },
  'Grid.Col': {
    toolIcon: 'Grid',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
    props: {
      size: { value: 'auto', values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'auto'] },
      offset: { value: 0, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    },
  },
  break1: true,
  'Header': {
    nowrap: true,
    toolIcon: 'Header',
    allowChildren: null,
    resizable: 'none',
  },
  'Sidebar': {
    toolIcon: 'Sidebar',
    allowChildren: null,
    resizable: 'none',
  },
  Button: {
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
  },
  Input: {
    allowChildren: null,
    toolIcon: 'Input',
    resizable: 'x',
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
    slots: ['prefix', 'postfix']
  },
  InputPassword: {
    allowChildren: null,
    toolIcon: 'InputPassword',
    resizable: 'x',
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
  },
  InputSlider: {
    allowChildren: null,
    toolIcon: 'InputCard',
    resizable: 'x',
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
  },
  InputPhone: {
    allowChildren: null,
    toolIcon: 'InputPhone',
    resizable: 'x',
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
  },
  Textarea: {
    allowChildren: null,
    toolIcon: 'Textarea',
    resizable: 'x',
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
  },
  Radio: {
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
  },
  Checkbox: {
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
  },
  Switcher: {
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
  },
  Calendar: {
    allowChildren: null,
    toolIcon: 'Calendar',
    resizable: 'none',
  },
  Datepicker: {
    allowChildren: null,
    toolIcon: 'DatePicker',
    resizable: 'x',
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
  },
  Select: {
    allowChildren: 'all',
    toolIcon: 'Select',
    resizable: 'x',
  },
  'Select.Option': {
    allowChildren: null,
    props: {
      $text: { value: '' },
    },
    toolIcon: 'Select',
    resizable: 'x',
  },
  'Tooltip': {
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
  },
  'Heading': {
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
  },
  'Text': {
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
  },
  'Badge': {
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
  },
  'Spinner': {
    toolIcon: 'Spinner',
    allowChildren: null,
    resizable: 'none',
    props: {
      size: {
        value: 'm', values: ["xs", "s", "m", "l", "xl", "xxl"],
      },
      position: { value: 'relative', values: ['relative', 'absolute'] }
    },
  },
  'Progressbar': {
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
  },
  'Alert': {
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
  },
  'Tabs': {
    toolIcon: 'Tabs',
    allowChildren: ['Tabs.Tab'],
    defaultChildren: ['Tabs.Tab'],
    resizable: 'none',
    nowrapChildren: true,
    nowrap: true,
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
  },
  'Tabs.Tab': {
    toolIcon: 'Tabs',
    allowChildren: 'string',
    resizable: 'none',
    nowrapChildren: true,
    nowrap: true,
    props: {
      $text: { value: '' },
      value: { value: '' },
      active: { value: false, values: [true, false] },
      disabled: { value: false, values: [true, false] }
    },
  },
  Modal: {
    toolIcon: 'Modal',
    allowChildren: ['Modal.Layout'],
    defaultChildren: ['Modal.Layout'],
    props: {
      isOpen: { value: true, values: [true, false] },
    },
    resizable: 'x',
    nowrapChildren: true
  },
  'Modal.Layout': {
    toolIcon: 'Modal',
    allowChildren: ['Modal.Head', 'Modal.Body', 'Modal.Footer'],
    defaultChildren: ['Modal.Head', 'Modal.Body', 'Modal.Footer'],
    resizable: 'none',
    nowrapChildren: true,
  },
  'Modal.Head': {
    toolIcon: 'Modal',
    allowChildren: ['Modal.Title'],
    defaultChildren: ['Modal.Title'],
    resizable: 'none',
    nowrapChildren: true,
  },
  'Modal.Title': {
    toolIcon: 'Modal',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
    props: {
      $text: { value: '' },
    },
  },
  'Modal.Body': {
    toolIcon: 'Modal',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
  },
  'Modal.Footer': {
    toolIcon: 'Modal',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
  },
  Drawer: {
    toolIcon: 'Drawer',
    allowChildren: ['Drawer.Layout'],
    defaultChildren: ['Drawer.Layout'],
    props: {
      isOpen: { value: true, values: [true, false] },
    },
    resizable: 'x',
    nowrapChildren: true
  },
  'Drawer.Layout': {
    toolIcon: 'Drawer',
    allowChildren: ['Drawer.Head', 'Drawer.Body', 'Drawer.Footer'],
    defaultChildren: ['Drawer.Head', 'Drawer.Body', 'Drawer.Footer'],
    resizable: 'none',
    nowrapChildren: true,
  },
  'Drawer.Head': {
    toolIcon: 'Drawer',
    allowChildren: ['Drawer.Title'],
    defaultChildren: ['Drawer.Title'],
    resizable: 'none',
    nowrapChildren: true,
  },
  'Drawer.Title': {
    toolIcon: 'Drawer',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
    props: {
      $text: { value: '' },
    },
  },
  'Drawer.Body': {
    toolIcon: 'Drawer',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
  },
  'Drawer.Footer': {
    toolIcon: 'Drawer',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
  },
  'Stepper': {
    toolIcon: 'Stepper',
    allowChildren: ['Stepper.Step'],
    defaultChildren: ['Stepper.Step'],
    resizable: 'none',
    nowrapChildren: true,
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
    toolIcon: 'Stepper',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
    props: {
      $text: { value: '' },
      value: { value: '' },
    },
  },
  'Hint': {
    toolIcon: 'Popover',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
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
    toolIcon: 'Popover',
    allowChildren: 'all',
    resizable: 'none',
    nowrapChildren: true,
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
