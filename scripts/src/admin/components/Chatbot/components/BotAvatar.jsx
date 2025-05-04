import React from 'react'
import { Avatar, Paper } from '@mui/material';
import chatbotImage from '@admin/assets/chatbot.png';

const BotAvatar = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                ml: {
                    xs: '0px',
                    sm: '-15px',
                },
                width: '40px',
                height: '40px',
                borderRadius: '50%',
            }}
        >
            <Avatar
                alt="Remy Sharp"
                src={chatbotImage}
                sx={{
                    backgroundColor: 'background.chatbot',
                    width: '40px',
                    height: '40px',
                    padding: '3px',
                }}
            />
        </Paper>
    )
}

export default BotAvatar;
