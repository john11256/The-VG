import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store/store';

ReactDOM.render(
  <Provider store={store}>  {/* Se envuelve con el provider el archivo raiz SIEMPRE  */}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
