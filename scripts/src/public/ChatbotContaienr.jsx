import React, { useState } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import ChatBot from '@public/components/Chatbot';
import chatImage from './assets/chatbot.png';

const ChatbotContainer = () => {

    const [opened, setOpened] = useState(false);

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 10,
                    right: 30,
                    zIndex: 1300,
                }}
            >
                <img
                    src={chatImage}
                    alt="Chatbot"
                    draggable={false}
                    style={{
                        width: 50,
                        height: 50,
                        padding: 8,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.29)',
                    }}
                    onClick={() => setOpened(true)}
                />
            </Box>

            {opened && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.50)',
                        zIndex: 1200,
                    }}
                    className='chatboxContainer'
                >
                    <ClickAwayListener onClickAway={() => setOpened(false)}>
                        <Box
                            sx={{
                                color: 'transparent',
                                position: 'absolute',
                                overflow: 'hidden',
                                width: 'min(550px, 80%)',
                                height: '85vh',
                                right: '60px',
                                bottom: '65px',
                                zIndex: 9999,
                            }}
                        >
                            <ChatBot />
                        </Box>
                    </ClickAwayListener>
                </Box>
            )}
        </>
    );
};

export default ChatbotContainer;
