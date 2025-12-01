import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AdminContextProvider from './context/AdminContext.jsx';
import WorkerContextProvider from './context/WorkerContext.jsx';
import AppContextProvider from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <WorkerContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </WorkerContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
