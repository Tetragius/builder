import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';

import './DnDListeners';

import ESService from './services/ESBuild/ESBuild';
import { FS } from './services/FileSystem';

import 'perfect-scrollbar/css/perfect-scrollbar.css';

window['esbuild'] = ESService;
window['fs'] = FS;

ReactDOM.render(<App />, document.getElementById('app'));