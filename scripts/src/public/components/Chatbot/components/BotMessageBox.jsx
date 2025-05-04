import React from 'react'
import { Paper } from '@mui/material'

const BotMessageBox = ({children}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: 'background.botmessage',
                color: 'text.main',
                maxWidth: '400px',
                borderRadius: '16px 16px 16px 0px',
                position: 'relative',
                px: 2,
                py: 2,
            }}
        >
            {children}
        </Paper>
    )
}

export default BotMessageBox;
