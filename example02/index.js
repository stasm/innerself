import { attach } from './reducers/store';
import App from './components/App';

attach(App, document.getElementById('app'));
