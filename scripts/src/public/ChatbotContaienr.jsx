import React, { useState, useRef } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import ChatBot from '@public/Chatbot.jsx';
import chatImage from './assets/chatbot.png';

const ChatbotContainer = () => {

    const [opened, setOpened] = useState(false);
    const chatbotRef = useRef(null);

    return (
        <>
            {/* <Draggable> */}
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 12,
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
            {/* </Draggable> */}

            {/* Chat Container (Initially Centered + Draggable + ClickAway) */}
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
                    {/* <Draggable
                        nodeRef={chatbotRef}
                        // defaultPosition={{
                        //     x: (window.innerWidth - 650) / 2,
                        //     y: (window.innerHeight - 500) / 2,
                        // }}
                    > */}
                        <Box
                            ref={chatbotRef}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                boxShadow: 6,
                                overflow: 'hidden',
                                borderRadius: 5,
                                width: 'min(650px, 80%)',
                                zIndex: 1201,
                                margin: 'auto',
                            }}
                        >
                            <ClickAwayListener onClickAway={() => setOpened(false)}>
                                <Box>
                                    <ChatBot />
                                </Box>
                            </ClickAwayListener>
                        </Box>
                    {/* </Draggable> */}
                </Box>
            )}

        </>
    );
};

export default ChatbotContainer;
