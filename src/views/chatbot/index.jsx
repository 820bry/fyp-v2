import { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';

//import generateResponse from './MessageProcessing';
import { initializeModel, generateResponse } from './gemini';

const MessageList = styled(List)({
    height: '60vh',
    padding: '20px'
});

const MessageItem = styled(ListItem)(({ theme, sender }) => ({
    justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
    padding: '5px 0'
}));

const MessageContent = styled(Paper)(({ theme, sender }) => ({
    padding: '8px 13px',
    maxWidth: '70%',
    backgroundColor: sender === 'user' ? theme.palette.secondary.light : theme.palette.grey[200],
    color: sender === 'user' ? theme.palette.secondary.contrastText : theme.palette.text.primary
}));


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const scrollbarRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        initializeModel();
    }, []);

    const handleSend = async () => {
        if(input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInput(''); // reset text box
        setIsLoading(true);

        try {
            const response = await generateResponse(input);
            const botMessage = { text: response, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch(error) {
            console.error('Error:', error);
            const errMessage = { text: 'Sorry, I encountered an error. Please try again later.', sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, errMessage]);
        } finally {
            setIsLoading(false);
        }
    }

    const renderMessage = (message) => {
        if(message.sender === 'user') {
            return <Typography variant="body1" sx={{ fontSize: '12px' }}>{message.text}</Typography>
        } else {
            const parts = message.text.split('\n\n');
            return (
                <>
                <Typography variant="body1" sx={{ fontSize: '12px' }}>{parts[0]}</Typography>
                {parts[1] && <Typography variant="body1" sx={{ fontSize: '12px', mt: 1, fontWeight: 'bold' }}>{parts[1]}</Typography>}
                {parts[2] && (
                    <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>{parts[2].split('\n')[0]}</Typography>
                    {parts[2].split('\n').slice(1).map((resource, index, array) => (
                        <Link key={index} href={resource.split(': ')[1]} target="_blank" rel="noopener noreferrer" sx={{ fontSize: '12px' }}>
                            {resource.split(': ')[0]} {index < array.length - 1 && <br />}
                        </Link>
                    ))}
                    </Box>
                )}
                </>
            );
        }
    }

    return (
        <>
        <Card sx={{ 
            mb: 3, 
            boxShadow: 6,
            bgcolor: 'grey.100',
            color: 'black',
            px: 0.1,
            pt: 2,
            pb: 1.5
        }}
        >
            <Container maxWidth="sm">
                <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" gutterBottom>
                        Chat with Quest
                    </Typography>
                    <Paper elevation={3} sx={{ flexGrow: 1, mb: 2, display: 'flex', flexDirection: 'column' }}>
                        <PerfectScrollbar
                            ref={scrollbarRef}
                            options={{ suppressScrollX: true }}
                            style={{ width: '100%'}}
                        >
                            <MessageList>
                                <Typography variant="h6" align="center" sx={{ color: "lightgrey", pb: 3 }}>
                                    Quest does not store message data. Therefore, each chat session is unique and cannot be carried forward to future sessions.
                                </Typography>
                                
                                {messages.map((message, index) => (
                                    <MessageItem key={index} sender={message.sender}>
                                        <MessageContent sender={message.sender}>
                                            <Typography variant="body1" sx={{ fontSize: '12px' }}>{message.text}</Typography>
                                        </MessageContent>
                                    </MessageItem>
                                ))}
                                {isLoading && <Typography variant="body1" sx={{ fontSize: '12px' }}>Bot is typing...</Typography>}
                                <div ref={messagesEndRef} />
                            </MessageList>
                        </PerfectScrollbar>
                    </Paper>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            autoComplete='off'
                            fullWidth
                            variant="outlined"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <IconButton
                            color="secondary"
                            onClick={handleSend}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ pt: 1.5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant="h6" align='center' sx={{ color: 'grey', lineHeight: 1.2 }}>
                            To protect your privacy, this prototype does not have access to your data.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Card>
        </>
    );
}

export default Chatbot;