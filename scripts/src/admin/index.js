import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';

import Layout from './Layout';

import './index.css';

createRoot(document.getElementById('chatbotadmin')).render(
    <Provider store={store}>
        <Layout />
    </Provider>,
);