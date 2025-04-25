// src/components/ChatBot.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';
import Fuse from "fuse.js";
import {
    Box, TextField, IconButton, Avatar,
    Typography, Paper, Button,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion } from "motion/react";
import { BeatLoader } from 'react-spinners';

const submitAction = async (data) => {
    const result = await axios.post(`${chatbotLocalizer.apiurl}/chatbuddy/action`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "X-WP-Nonce":    chatbotLocalizer.nonce,
        },
    });

    return result.data;
}

/**
 * Default message
 */
const DEFAULT_MESSAGE = '👋 Hi, we\'r here to help you.';

/**
 * Not Find message
 */
const NOT_UNDERSTAND = 'sorry, we didn\'t understand uou right.';

/**
 * Get root node
 */
const getRootNode = (nodes) => {
    return nodes.find((node) => node.data.key == 'root');
}

/**
 * Get child nodes
 */
const getChildNodes = (rootNode, nodes, edges) => {

    const rootId = rootNode.id;

    // Get all outgoing edges
    const outgoingEdges = edges.filter((edge) => edge.source == rootId);

    // Get all connected nodes id
    const connectedNodesId = outgoingEdges.map((edg) => edg.target);

    // Get all children nodes
    const childNodes = nodes.filter((node) => connectedNodesId.includes(node.id));

    // Sort all children from left to right
    const sortedChildNodes = childNodes.sort((node1, node2) => node1.position.x < node2.position.x);

    return sortedChildNodes;
}


/**
 * Main chatbot component
 */
const ChatBot = () => {
    /**
     * Collect smartAnswer and flow builder
     */
    const smartAnswer = chatbotLocalizer.smartAnswer;

    // Get nodes and edges
    const nodes = chatbotLocalizer.decisionGraph.nodes;
    const edges = chatbotLocalizer.decisionGraph.edges;

    /**
     * Crate fuze object
     */
    const fuse = useMemo(() => new Fuse(smartAnswer || [], {
        keys: ['question'],
        threshold: 0.6,
    }), [smartAnswer]);

    /**
     * State variable for storing message
     */
    const [messages, setMessages] = useState([
        { from: 'bot', type: 'message', text: DEFAULT_MESSAGE, time: new Date() },
        { from: 'bot', type: 'option', node: getRootNode(nodes), time: new Date() },
    ]);

    /**
     * State varaible for store user input
     */
    const [input, setInput] = useState('');

    /**
     * Reference variable for motion scrolling
     */
    const endRef = useRef(null);

    /**
     * Smooth scroll animation
     */
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /**
     * Get search result
     */
    const getSearchResult = (userInput) => {

        // Fuzzy search from smartAnswer
        const result = fuse.search(userInput);

        if (result.length > 0) {
            return result[0].item.answer;
        }

        return NOT_UNDERSTAND;
    }

    /**
     * Handle message send by user
     */
    const handleMessageSend = () => {

        const userInput = input.trim();

        // Check for valid input
        if (!userInput) return;

        // Clear user input
        setInput('');

        // Process user message
        const userMessage = { from: 'user', type: 'message', text: userInput, time: new Date() };
        setMessages(prev => [...prev, userMessage]);

        // Prepare bot message
        setTimeout(() => {
            const botMessage = {
                from: 'bot',
                type: 'message',
                text: getSearchResult(userInput),
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 600);

        setTimeout(() => {
            const botMessage = {
                from: 'bot',
                type: 'option',
                node: getRootNode(nodes),
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1200);
    };

    /**
     * Handle option chose by user
     */
    const handleOptionChose = (newNode) => {

        /**
         * Handle Action submit
         */
        if (newNode.type == 'action') {

            // Check action has input or not
            const inputs = newNode.data.inputs?.trim();
            const hasInput = inputs?.length > 0;

            // If it has input then show inputsection
            if (hasInput) {

                // Set user reply
                setTimeout(() => {
                    const botMessage = {
                        from:        'user',
                        type:        'action',
                        action:      newNode.data.key,
                        text:        newNode.data.message,
                        inputs:      inputs,
                        inputsValue: {},
                        time:        new Date()
                    };
                    setMessages(prev => [...prev, botMessage]);
                }, 600);
            } else {
                const userMessage = {
                    from: 'user',
                    type: 'message',
                    text: newNode.data.label,
                    time: new Date()
                };
                setMessages(prev => [...prev, userMessage]);
                handleActionSubmit({ action: newNode.data.key, value: {} });
            }

            return;
        }

        /**
         * Handle Redirect submit
         */
        if (newNode.type == 'redirect') {
            window.open(newNode.data.url, '_blank');
        }

        // Set user reply
        const userMessage = { from: 'user', type: 'message', text: newNode.data.label, time: new Date() };
        setMessages(prev => [...prev, userMessage]);


        // Get child of new Node
        const newNodesChildren = getChildNodes(newNode, nodes, edges);

        // Set bot reply
        setTimeout(() => {
            const botMessage = {
                from: 'bot',
                type: 'option',
                node: newNode,
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 600);

        // Reset conversation if the option is finished
        if (newNodesChildren.length == 0) {
            setTimeout(() => {
                const botMessage = {
                    from: 'bot',
                    type: 'option',
                    node: getRootNode(nodes),
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);
            }, 600);
        }
    }

    /**
     * Handle Action submit
     */
    const handleActionSubmit = async ({ action, value }) => {

        // Set bot loading message
        const botLoadingMessage = { from: 'bot', type: 'loading', time: new Date() };
        setMessages(prev => [...prev, botLoadingMessage]);

        const { message } = await submitAction({ action: action, value: value });

        // Remove bot loading message
        setMessages((preMsg) => preMsg.filter((msg, ind) => ind != preMsg.length - 1));

        // Set bot message
        setTimeout(() => {
            const botMessage = {
                from: 'bot',
                type: 'message',
                text: message,
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 600);

        setTimeout(() => {
            const botMessage = {
                from: 'bot',
                type: 'option',
                node: getRootNode(nodes),
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1200);
    }

    /**
     * Formate time string
     */
    const formatTime = (time) => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    /**
     * Get input array from input string
     */
    const prepareInput = (inputStr) => {
        const result = inputStr
            .split('|')                                     // Split by separator
            .map((part) => {
                return {
                    key: part.trim()                                 // Remove extra spaces
                        .toLowerCase()                              // Lowercase all
                        .replace(/\b\w/g, c => c.toUpperCase())     // Capitalize first letter of each word
                        .replace(/\s+/g, ''),                       // Remove spaces to make camel case-like
                    label: part
                }
            });
        return result;
    }

    return (
        <Paper elevation={6} sx={{
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 5,
            backdropFilter: 'blur(12px)',
            background: '#ffffffaa',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        }}>
            {/* Header Section */}
            <Box sx={{
                className: 'chatbot-header',
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                gap: 1,
            }}>
                <SmartToyIcon />
                <Typography variant="h6" className="chatTitle">ChatBuddy</Typography>
            </Box>

            {/* Message Section */}
            <Box
                sx={{
                    flexGrow: 1,
                    px: 2,
                    py: 3,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                }}
            >
                {messages.map((msg, index) => {

                    const isUser = msg.from === 'user';
                    const isOption = msg.type === 'option';
                    const isAction = msg.type === 'action';
                    const isLoading = msg.type === 'loading';
                    const isPreviousBot = index > 0 && messages[index - 1].from === 'bot';
                    const isNextBot = index < messages.length - 1 && messages[index + 1].from === 'bot';

                    // Get the child nodes
                    const childNodes = isOption ? getChildNodes(msg.node, nodes, edges) : null;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                alignSelf: isUser ? 'flex-end' : 'flex-start',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '8px',
                                maxWidth: '70%',
                            }}
                        >
                            {/** Render avater */}
                            {!isUser && <>
                                {
                                    !isPreviousBot ?
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            {
                                                !isPreviousBot &&
                                                <SmartToyIcon fontSize="small" />
                                            }
                                        </Avatar>
                                        :
                                        <Box sx={{ width: 32, height: 32 }}></Box>
                                }
                            </>
                            }
                            <Box
                                sx={{
                                    bgcolor: isUser ? 'primary.main' : '#ececec',
                                    color: isUser ? 'white' : 'black',
                                    width: isAction ? '350px' : 'auto',
                                    maxWidth: '400px',
                                    px: 2,
                                    py: 1.2,
                                    borderRadius: isUser ? '16px 16px 0px 16px' : '16px 16px 16px 0px',
                                    position: 'relative',
                                    boxShadow: "0 0 3px #aaaaaaaa",
                                }}
                            >
                                {/* Render Loading */}
                                {
                                    isLoading &&
                                    <Box sx={{ width: 200, height: 20, display: 'flex', justifyContent: 'center' }}>
                                        <BeatLoader size={14} color='#17A2B8' />
                                    </Box>

                                }

                                {/* Render message */}
                                {
                                    !isLoading &&
                                    <>
                                        {
                                            !isOption ?
                                                <Typography variant="body2">{msg.text}</Typography>
                                                :
                                                <Typography variant="body2">{msg.node.data.message}</Typography>
                                        }
                                    </>
                                }

                                {/* Render option */}
                                {
                                    isOption && childNodes.length > 0 &&
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 0.7,
                                            my: 2,
                                        }}
                                    >
                                        {
                                            childNodes.map((node) => {
                                                return (
                                                    <Button
                                                        variant="outlined"
                                                        size='small'
                                                        onClick={() => handleOptionChose(node)}
                                                    >{node.data.label}</Button>
                                                )
                                            })
                                        }
                                    </Box>
                                }

                                {/* Render inputs */}
                                {
                                    isAction &&
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 0.5,
                                                mt: 1.5,
                                            }}
                                        >
                                            {
                                                prepareInput(msg.inputs).map((input) => (
                                                    <TextField
                                                        variant="standard"
                                                        placeholder={input.label}
                                                        value={msg.inputsValue[input.key]}
                                                        onChange={(e) => {
                                                            setMessages((prevMsg) => {
                                                                return prevMsg.map(( pmsg, ind ) => {
                                                                    return ind == index ? {...pmsg, inputsValue: { ...pmsg.inputsValue, [input.key]: e.target.value }} : pmsg;
                                                                })
                                                            })
                                                        }}
                                                        fullWidth
                                                    />
                                                ))
                                            }
                                        </Box>
                                        <Box sx={{textAlign: 'right'}}>
                                            <IconButton
                                                sx={{ color: 'white' }}
                                                onClick={() => handleActionSubmit({ action: msg.action, value: msg.inputsValue })}
                                            >
                                                <SendIcon />
                                            </IconButton>
                                        </Box>
                                    </>
                                }

                                {/* Render timestamp */}
                                {
                                    !isNextBot &&
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            position: 'absolute',
                                            bottom: -22,
                                            left: 6,
                                            opacity: 0.6,
                                            fontSize: '0.7rem',
                                        }}
                                    >
                                        {formatTime(msg.time)}
                                    </Typography>
                                }
                            </Box>
                        </motion.div>
                    );
                })}
                <div ref={endRef} />
            </Box>

            {/* Input Section */}
            <Box
                sx={{
                    p: 2,
                    bgcolor: 'background.paper',
                    borderTop: '1px solid #eee',
                    position: 'relative'
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1,
                        borderRadius: 999,
                        background: '#f5f5f5',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        gap: 1.5,
                    }}
                >
                    {/* 💬 Text Input */}
                    <TextField
                        variant="standard"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
                        fullWidth
                    />
                    <IconButton onClick={handleMessageSend} color="primary">
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Box>

        </Paper>
    );
};

export default ChatBot;
