import React, { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';
import Fuse from "fuse.js";

import Container from './components/Container';
import Header from './components/Header';
import MessageContainer from './components/MessageContainer';
import BotAvatar from './components/BotAvatar';
import MessageBoxWrapper from './components/MessageBoxWrapper';
import LoadingMessage from './components/LoadingMessage';
import OptionButton from './components/OptionButton';
import ActionInput from './components/ActionInput';
import SubmitIcon from './components/SubmitIcon';
import MessageInput from './components/MessageInput';

import { Box, IconButton, Typography } from '@mui/material';

import { useTheme } from '@mui/material/styles';

/**
 * Create sleep function
 */
const sleep = async (time) => {
    return new Promise((res, rej) => {
        setTimeout(() => { res() }, time)
    })
}

/**
 * Submit action functionlity
 * @param {*} data 
 * @returns 
 */
const submitAction = async (data) => {
    const result = await axios.post(`${chatbotLocalizer.apiurl}/chatbuddy/action`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            "X-WP-Nonce": chatbotLocalizer.nonce,
        },
    });

    return result.data;
}

/**
 * Default message
 */
const DEFAULT_MESSAGE = 'Hi, we\'r here to help you.';

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
     * Get the theme object
     */
    const theme = useTheme();

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
     * Handle action chose
     */
    const handleActionChose = (newNode) => {
        // Check action has input or not
        const inputs = newNode.data.inputs?.trim();
        const hasInput = inputs?.length > 0;

        // If it has input then show inputsection
        if (hasInput) {

            // Set user reply
            setTimeout(() => {
                const botMessage = {
                    from: 'user',
                    type: 'action',
                    node: newNode,
                    action: newNode.data.key,
                    text: newNode.data.message,
                    inputs: inputs,
                    inputsValue: {},
                    time: new Date()
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
            handleActionSubmit({ action: newNode.data.key, value: {}, node: newNode });
        }
    }

    /**
     * Handle redirect chose by user
     */
    const handleRedirectChose = (newNode) => {
        window.open(newNode.data.url, '_blank');
    }

    /**
     * Handle option chose by user
     */
    const handleOptionChose = async (newNode) => {

        /**
         * Handle Action submit
         */
        if (newNode.type == 'action') {
            handleActionChose(newNode);
            return;
        }

        /**
         * Handle Redirect submit
         */
        if (newNode.type == 'redirect') {
            handleRedirectChose(newNode);
        }

        // Set user reply
        const userMessage = { from: 'user', type: 'message', text: newNode.data.label, time: new Date() };
        setMessages(prev => [...prev, userMessage]);

        let currentNode = newNode;

        while (true) {

            if (currentNode.type == 'action') {
                await sleep(100);
                handleActionChose(currentNode);
                return;
            }

            if (currentNode.type == 'redirect') {
                await sleep(100);
                handleRedirectChose(currentNode);
            }

            // Get child of new Node
            const currentNodeChilds = getChildNodes(currentNode, nodes, edges);

            // if current node has no children
            if (currentNodeChilds.length === 0) {

                const nodeMessage = currentNode.data.message;

                await sleep(300);
                let botMessage = {
                    from: 'bot',
                    type: 'message',
                    text: nodeMessage,
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);

                await sleep(300);
                botMessage = {
                    from: 'bot',
                    type: 'option',
                    node: getRootNode(nodes),
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);

                return;
            }

            if (currentNodeChilds.length > 1) {
                await sleep(300);
                const botMessage = {
                    from: 'bot',
                    type: 'option',
                    node: currentNode,
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);

                return;
            }

            const nodeMessage = currentNode.data.message;
            await sleep(300);
            const botMessage = {
                from: 'bot',
                type: 'message',
                text: nodeMessage,
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);

            currentNode = currentNodeChilds[0];
        }
    }

    /**
     * Handle Action submit
     */
    const handleActionSubmit = async ({ action, value, node }) => {

        // Set bot loading message
        const botLoadingMessage = { from: 'bot', type: 'loading', time: new Date() };
        setMessages(prev => [...prev, botLoadingMessage]);

        const { message } = await submitAction({ action: action, value: value });

        // Remove bot loading message
        setMessages((preMsg) => preMsg.filter((msg, ind) => ind != preMsg.length - 1));

        let currentNode       = node;
        let currentNodeChilds = getChildNodes(currentNode, nodes, edges);

        // Check for no nodes
        if (currentNodeChilds.length === 0) {
            const nodeMessage = currentNode.data.message;

            await sleep(300);
            let botMessage = {
                from: 'bot',
                type: 'option',
                node: getRootNode(nodes),
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);

            return;
        }

        // Check for multiple node
        if (currentNodeChilds.length > 1) {
            await sleep(300);
            const botMessage = {
                from: 'bot',
                type: 'option',
                node: currentNode,
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);

            return;
        }
        
        currentNode = currentNodeChilds[0];

        while (true) {

            if (currentNode.type == 'action') {
                await sleep(100);
                handleActionChose(currentNode);
                return;
            }

            if (currentNode.type == 'redirect') {
                await sleep(100);
                handleRedirectChose(currentNode);
            }

            // Get child of new Node
            let currentNodeChilds = getChildNodes(currentNode, nodes, edges);

            // if current node has no children
            if (currentNodeChilds.length === 0) {

                const nodeMessage = currentNode.data.message;

                await sleep(300);
                let botMessage = {
                    from: 'bot',
                    type: 'message',
                    text: nodeMessage,
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);

                await sleep(300);
                botMessage = {
                    from: 'bot',
                    type: 'option',
                    node: getRootNode(nodes),
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);

                return;
            }

            if (currentNodeChilds.length > 1) {
                await sleep(300);
                const botMessage = {
                    from: 'bot',
                    type: 'option',
                    node: currentNode,
                    time: new Date()
                };
                setMessages(prev => [...prev, botMessage]);

                return;
            }

            const nodeMessage = currentNode.data.message;
            await sleep(300);
            const botMessage = {
                from: 'bot',
                type: 'message',
                text: nodeMessage,
                time: new Date()
            };
            setMessages(prev => [...prev, botMessage]);

            currentNode = currentNodeChilds[0];
        }
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
            .split('|')                                             // Split by separator
            .map((part) => {
                return {
                    key: part.trim()                                // Remove extra spaces
                        .toLowerCase()                              // Lowercase all
                        .replace(/\b\w/g, c => c.toUpperCase())     // Capitalize first letter of each word
                        .replace(/\s+/g, ''),                       // Remove spaces to make camel case-like
                    label: part
                }
            });
        return result;
    }

    return (
        <Container>

            {/* Header Section */}
            <Header />

            {/* Message Contaienr section */}
            <MessageContainer>
                {
                    messages.map((msg, index) => {

                        const isUser = msg.from === 'user';
                        const isOption = msg.type === 'option';
                        const isAction = msg.type === 'action';
                        const isLoading = msg.type === 'loading';
                        const isPreviousBot = index > 0 && messages[index - 1].from === 'bot';
                        const isNextBot = index < messages.length - 1 && messages[index + 1].from === 'bot';

                        // Get the child nodes
                        const childNodes = isOption ? getChildNodes(msg.node, nodes, edges) : null;

                        return (
                            <>
                                {/* Render the avater */}
                                {
                                    !isUser && !isPreviousBot && <BotAvatar />
                                }

                                <MessageBoxWrapper key={index} isUser={isUser}>
                                    {/* Render Loading */}
                                    {
                                        isLoading && <LoadingMessage />
                                    }

                                    {/* Render message */}
                                    {
                                        !isLoading &&
                                        <>
                                            {
                                                !isOption ?
                                                    <Typography sx={{ whiteSpace: 'pre-line', fontSize: '18px', fontWeight: '350' }} variant="body">{msg.text}</Typography>
                                                    :
                                                    <Typography sx={{ whiteSpace: 'pre-line', fontSize: '18px', fontWeight: '350' }} variant="body">{msg.node.data.message}</Typography>
                                            }
                                        </>
                                    }

                                    {/* Render option */}
                                    {
                                        isOption && childNodes.length > 0 &&
                                        <Box
                                            sx={{ display: 'flex', flexDirection: 'column', gap: 0.9, mt: 2, }}
                                        >
                                            {
                                                childNodes.map((node) => {
                                                    return (
                                                        <OptionButton onClick={() => handleOptionChose(node)}>
                                                            {node.data.label}
                                                        </OptionButton>
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
                                                sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}
                                            >
                                                {
                                                    prepareInput(msg.inputs).map((input) => (
                                                        <ActionInput
                                                            placeholder={input.label}
                                                            value={msg.inputsValue[input.key]}
                                                            onChange={(e) => {
                                                                setMessages((prevMsg) => {
                                                                    return prevMsg.map((pmsg, ind) => {
                                                                        return ind == index ? { ...pmsg, inputsValue: { ...pmsg.inputsValue, [input.key]: e.target.value } } : pmsg;
                                                                    })
                                                                })
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                                                <IconButton
                                                    sx={{
                                                        width: '41px',
                                                        height: '41px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                    onClick={() => handleActionSubmit({ action: msg.action, value: msg.inputsValue, node: msg.node })}
                                                >
                                                    <SubmitIcon color={theme.palette.button.submitInput} />
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
                                </MessageBoxWrapper>
                            </>
                        );
                    })}
                <div ref={endRef} />
            </MessageContainer>

            {/* Input Section */}
            <Box
                sx={{
                    p: 3,
                    bgcolor: 'background.messageInput',
                    borderTop: '1px solid #eee',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                }}
            >
                {/*Text Input */}
                <MessageInput
                    placeholder="Compose your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleMessageSend()}
                />
                <IconButton
                    sx={{
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={handleMessageSend}
                >
                    <SubmitIcon color={theme.palette.button.submitMessage} />
                </IconButton>
            </Box>
        </Container>
    );
};

export default ChatBot;
