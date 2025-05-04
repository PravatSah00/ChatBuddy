import React from 'react'
import { Box, Typography, Avatar } from '@mui/material';
import chatbotImage from '@admin/assets/chatbot.png';

const Header = () => {
    return (
        <Box sx={{
            bgcolor: 'background.header',
            display: 'flex',
            alignItems: 'center',
            paddingY: 1.5,
            paddingX: 5,
            gap: 1,
        }}>
            {/* Chatbot avatar */}
            <Avatar
                alt="Remy Sharp"
                src={chatbotImage}
                sx={{
                    backgroundColor: 'background.avatar',
                    width: '50px',
                    height: '50px',
                    padding: '3px',
                }}
            />
            
            {/* Chatbot title */}
            <Typography
                variant="h5"
                sx={{
                    color: 'text.header'
                }}
            >Chatbuddy</Typography>
        </Box>
    )
}

export default Header;
