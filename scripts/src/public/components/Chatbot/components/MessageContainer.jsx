import React from 'react'
import { Box } from '@mui/material';

const MessageContainer = ({ children }) => {
    return (
        <Box
            sx={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                backgroundColor: 'background.main',
                gap: 1.5,
                px: {
                    xs: 2,
                    sm: 4,
                },
                py: 3,
            }}
        >
            {children}
        </Box>
    );
}

export default MessageContainer;
