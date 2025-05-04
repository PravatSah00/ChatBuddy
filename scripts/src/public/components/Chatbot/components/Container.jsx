import React from 'react'
import { Paper } from '@mui/material';

const Container = ({ children, ...args }) => {
    return (
        <Paper
            {...args}
            elevation={6}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 6,
                backgroundColor: 'background.main',
                color: 'text.main',
                overflow: 'hidden',
            }}
        >
            {children}
        </Paper>
    )
}

export default Container;
