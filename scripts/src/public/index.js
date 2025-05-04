import { createRoot } from 'react-dom/client';

import ChatbotContaienr from './ChatbotContaienr'; 

/**
 * Theme support
 */
import { ColorModeProvider } from '@public/theme/ThemeContext';

import './index.css';

createRoot(document.getElementById('chatbotpublic')).render(
    <ColorModeProvider>
        <ChatbotContaienr/>
    </ColorModeProvider>,
);