import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';

import './DnDListeners';
import './services/PrepareProject';
import './services';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

ReactDOM.render(<App />, document.getElementById('app'));