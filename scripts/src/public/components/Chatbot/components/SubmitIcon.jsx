import React from 'react'

const SubmitIcon = ({color, ...props}) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 32 32"
        >
            <polygon
                points="16,4 28,28 4,28"
                fill={color}
                transform="rotate(45 16 16)"
            />
        </svg>

    )
}

export default SubmitIcon;
