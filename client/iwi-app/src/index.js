import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storeCongig from './store/store';
import { SnackbarProvider } from 'react-snackbar-alert';

const { persistor, store } = storeCongig();

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </PersistGate>
        </Provider>
    </Router>
    , document.getElementById('root'));