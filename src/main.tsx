import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './redux/context/cartContext.tsx';
import {  WarningProvider } from './redux/context/WarningContext.tsx';
import AppContent from './AppContent.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CartProvider>
        <WarningProvider>
          <Toaster />
          <AppContent />
        </WarningProvider>
      </CartProvider>
    </Provider>
  </React.StrictMode>,
);
