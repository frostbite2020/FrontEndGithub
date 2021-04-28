import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tools/bootstrap';
import {BrowserRouter} from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/all';
import {Provider} from 'react-redux'
import configureStore from "./Redux/configureStore";

const store = configureStore();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);


reportWebVitals();
