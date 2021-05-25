import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';

import './DnDListeners';
import './services';

import { instanse } from './store/store';
import ESService from './services/ESBuild/ESBuild';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { baseProjectInit } from './presets/basicProjectPreset';

window['esbuild'] = ESService;
window['raxyInstanse'] = instanse;

baseProjectInit('MyProject');

ReactDOM.render(<App />, document.getElementById('app'));