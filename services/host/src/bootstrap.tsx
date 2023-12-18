import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AppProvider } from './appContext';

import ProviderLang from './middleware/provider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppProvider>
    <ProviderLang />
    <App />
  </AppProvider>,
);
