import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/AuthContext';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <AuthContextProvider>
      <ToastContainer />
      <App />
    </AuthContextProvider>
  </RecoilRoot>
);

