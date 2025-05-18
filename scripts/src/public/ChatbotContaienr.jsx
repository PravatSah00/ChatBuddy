import React, { useRef, useState } from 'react';
import { Box, ClickAwayListener, Button } from '@mui/material';
import ChatBot from '@public/components/Chatbot';
import chatImage from './assets/main-icon.gif';

function ChatBubbleLauncher({ onClick }) {
    return (
        <Box
            className="chatbotMessageAnimation"
            sx={{
                position: 'fixed',
                bottom: 75,
                right: 24,
                zIndex: 1300,
            }}
            onClick={onClick}
        >
            <Button
                variant="contained"
                color="primary"
                // startIcon={<ChatIcon />}
                sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    px: 2.5,
                    py: 0.7,
                    boxShadow: 4,
                    fontSize: "14px",
                    backgroundColor: '#2b71f0',
                    '&:hover': {
                        backgroundColor: '#1a5edb',
                    },
                }}
            >
                {/* Compose your reply */}
                Hi there  👋 how can I help you?
            </Button>
        </Box>
    );
}

const ChatbotContainer = () => {

    const [opened, setOpened] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

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
                {
                    !opened && firstTime &&
                        <ChatBubbleLauncher
                            onClick={(e) => {
                                setFirstTime(false);
                                setOpened(!opened);
                                e.stopPropagation();
                            }}
                        />
                }
                <img
                    src={chatImage}
                    alt="Chatbot"
                    draggable={false}
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.29)',
                    }}
                    onClick={(e) => {
                        setFirstTime(false);
                        setOpened(!opened);
                        e.stopPropagation();
                    }}
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
                                width: 'min(550px, 90%)',
                                height: '85vh',
                                right: {
                                    xs: '50%',
                                    sm: '50%',
                                    md: '60px',
                                },
                                transform: {
                                    xs: 'translateX(50%)',
                                    sm: 'translateX(50%)',
                                    md: 'none',
                                },
                                bottom: '70px',
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
