/**
 *React core import 
 */
import { createRoot } from 'react-dom/client';

/**
 * Import router
 */
import Router from "@admin/Router.jsx";

/**
 * Redux-toolkit support
 */
import { Provider } from 'react-redux';
import store from '@admin/store.js';

/**
 * Theme support
 */
import { ColorModeProvider } from '@admin/theme/ThemeContext';

/**
 * Notis provider
 */
import { SnackbarProvider } from 'notistack';


import './index.css';

createRoot(document.getElementById('chatbotadmin')).render(
    <Provider store={store}>
        <ColorModeProvider>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                style={{ marginTop: '16px' }}
            >
                <Router />
            </SnackbarProvider>
        </ColorModeProvider>
    </Provider>,
);