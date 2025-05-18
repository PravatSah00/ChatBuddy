import React from 'react'
import { Box, Typography, Avatar } from '@mui/material';
import chatbotImage from '@admin/assets/chatbot.png';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CrossButton = ({ onClick }) => (
    <IconButton
        aria-label="close"
        onClick={(e) => onClick(e)}
        sx={{
            position: 'absolute',
            right: 8,
            top: 15,
            color: (theme) => theme.palette.grey[500],
        }}
    >
        <CloseIcon />
    </IconButton>
);

const Header = ({onClose}) => {
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

            <CrossButton onClick={(e) => onClose(e) }/>
        </Box>
    )
}

export default Header;
