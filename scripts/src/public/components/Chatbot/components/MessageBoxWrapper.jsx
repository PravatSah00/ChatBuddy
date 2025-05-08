import React from 'react';
import { motion } from "motion/react";
import UserMessageBox from './UserMessageBox';
import BotMessageBox from './BotMessageBox';

const MessageBoxWrapper = ({isUser, children}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                maxWidth: '80%',
            }}
        >
            {
                isUser ?
                    <UserMessageBox>{children}</UserMessageBox>
                    :
                    <BotMessageBox>{children}</BotMessageBox>
                    
            }
        </motion.div>
    )
}

export default MessageBoxWrapper;
