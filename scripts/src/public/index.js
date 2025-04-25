import { createRoot } from 'react-dom/client';
import ChatbotContaienr from './ChatbotContaienr'; 
import './index.css';

createRoot(document.getElementById('chatbotpublic')).render(
    <ChatbotContaienr/>,
);