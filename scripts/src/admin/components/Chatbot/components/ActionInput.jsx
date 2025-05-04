import React from 'react'
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

const ActionInput = ({ ...props }) => {

    const theme = useTheme();

    return (
        <>
            <style>
                {`
                    .actionInput::placeholder {
                        color: ${theme.palette.text.input};
                        opacity: 0.8;
                    }
                `}
            </style>

            <Paper
                elevation={0}
                sx={{
                    width: '320px',
                    background: 'transparent',
                }}
            >
                <input
                    {...props}
                    className='actionInput'
                    style={{
                        backgroundColor: theme.palette.background.input,
                        color: theme.palette.text.input,
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

export default ActionInput;
