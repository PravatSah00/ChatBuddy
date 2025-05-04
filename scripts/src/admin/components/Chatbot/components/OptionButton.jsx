import React from 'react'
import { Button } from '@mui/material';

const OptionButton = ({ children, onClick }) => {
    return (
        <Button
            variant="outlined"
            sx={{

                borderRadius: '10px',
                padding: '6px 10px',
                color: 'button.primary',
                borderColor: 'button.primary',

                '&:hover': {
                    color: 'button.secondery',
                    borderColor: 'button.primary',
                    backgroundColor: 'button.primary',
                },
            }}
            // size='small'
            onClick={(e) => onClick(e)}
        >{children}</Button>
    )
}

export default OptionButton;
