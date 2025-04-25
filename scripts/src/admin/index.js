import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './store.js';

import Layout from './Layout';

import './index.css';

createRoot(document.getElementById('chatbotadmin')).render(
    <Provider store={store}>
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ marginTop: '16px' }}
        >
            <Layout />
        </SnackbarProvider>
    </Provider>,
);