import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import styled from 'styled-components';
import * as UI from 'vienna-ui';
import { Field } from './components';

if (window.frameElement) {

    window['ViennaUI'] = UI;
    window['React'] = React;
    window['ReactDOM'] = ReactDOM;
    window['styled'] = styled;
    window["react-router-dom"] = ReactRouterDOM;

    window['__webpack_require__'] = __webpack_require__;

    ReactDOM.render(<Field />, document.getElementById('frame'));
}