import React from 'react';
import ReactDOM from 'react-dom';
import * as UI from "vienna-ui";
import { Field } from './components';

import '../DnDListeners';

window['ViennaUI'] = UI;
window['React'] = React;
window['ReactDOM'] = ReactDOM;
window['__webpack_require__'] = __webpack_require__;

ReactDOM.render(<Field />, document.getElementById('frame'));