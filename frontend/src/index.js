import React from 'react';
import { HashRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import initFacebookSDK from './pages/trade/preview/facebooksdk/initFacebookSDK';

const renderApp = () => {
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <HashRouter>
      <App />
    </HashRouter>
  </>
);
}

renderApp();

// initFacebookSDK().then(() => {
//   renderApp();
// })