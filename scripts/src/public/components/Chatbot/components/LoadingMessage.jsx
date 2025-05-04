import React from 'react';
import { Box } from '@mui/material';
import { BeatLoader } from 'react-spinners';

const LoadingMessage = () => {
    return (
        <Box sx={{ width: 200, height: 20, display: 'flex', justifyContent: 'center' }}>
            <BeatLoader size={14} color='#17A2B8' />
        </Box>
    )
}

export default LoadingMessage
