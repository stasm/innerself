import { canvasBokeh } from '../node_modules/mini-bokeh/bokeh.js';
import { attach } from './reducers/store';

import Router from './router';

const bulbs = 10, hueShift = 180;

window._bgCanvas = {
	back: new canvasBokeh(document.getElementById('bokeh-back'), { bulbs: bulbs * 2, blur: 20, hueShift, drawBeforeStart: true }),
	front: new canvasBokeh(document.getElementById('bokeh-front'), { bulbs, blur: 4, transparent: true, hueShift, drawBeforeStart: true })
}

attach(Router, document.getElementById('viewbox'));
