import React from 'react'
import { Paper } from '@mui/material';

const UserMessageBox = ({children}) => {
    return (
        <Paper
            sx={{
                bgcolor: 'background.usermessage',
                color: 'text.usermessage',
                maxWidth: '400px',
                borderRadius: '16px 16px 0px 16px',
                position: 'relative',
                px: 2,
                py: 2,
            }}
        >{children}</Paper>
    )
}

export default UserMessageBox;
