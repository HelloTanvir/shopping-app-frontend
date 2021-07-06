import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeviceContextProvider from './contexts/DeviceContext';
import ProductContextProvider from './contexts/ProductContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <DeviceContextProvider>
        <ProductContextProvider>
            <App />
        </ProductContextProvider>
    </DeviceContextProvider>,
    document.getElementById('root')
);

reportWebVitals();
