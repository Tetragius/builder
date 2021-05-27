import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';

import './DnDListeners';

import { instanse } from './store/store';
import ESService from './services/ESBuild/ESBuild';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

window['esbuild'] = ESService;
window['raxyInstanse'] = instanse;

ReactDOM.render(<App />, document.getElementById('app'));