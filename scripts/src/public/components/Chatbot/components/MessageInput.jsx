import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

const MessageInput = ({...props}) => {

    const theme = useTheme();

    return (
        <>
            <style>
                {`
                    .messageInput::placeholder {
                        color: ${theme.palette.text.messageInput};
                        opacity: 1;
                    }
                `}
            </style>

            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    background: 'transparent',
                }}
            >
                <input
                    {...props}
                    className='messageInput'
                    style={{
                        backgroundColor: theme.palette.background.messageInput,
                        color: theme.palette.text.messageInput,
                        border: 'none',
                        outline: 'none',
                        padding: '12px 17px',
                        borderRadius: '10px',
                        fontSize: '18px',
                        width: '100%',
                    }}
                />
            </Paper>
        </>
    )
}

export default MessageInput
