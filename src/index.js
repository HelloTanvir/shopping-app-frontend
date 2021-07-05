import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ProductContextProvider from './contexts/ProductContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <ProductContextProvider>
        <App />
    </ProductContextProvider>,
    document.getElementById('root')
);

reportWebVitals();
