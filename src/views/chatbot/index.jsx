import { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';

const MessageList = styled(List)({
    height: '60vh',
    padding: '20px'
});

const MessageItem = styled(ListItem)(({ theme, sender }) => ({
    justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
    padding: '5px 0'
}));

const MessageContent = styled(Paper)(({ theme, sender }) => ({
    padding: '10px 15px',
    maxWidth: '70%',
    backgroundColor: sender === 'user' ? theme.palette.secondary.light : theme.palette.grey[200],
    color: sender === 'user' ? theme.palette.secondary.contrastText : theme.palette.text.primary
}));


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const scrollbarRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if(input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        setInput('');
    }

    return (
        <>
        <Card sx={{ 
            mb: 3, 
            boxShadow: 6,
            bgcolor: 'grey.100',
            color: 'black',
            px: 0.5,
            py: 2,
        }}
        >
            <Container maxWidth="sm">
                <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" gutterBottom>
                        Chat with Project Aura
                    </Typography>
                    <Paper elevation={3} sx={{ flexGrow: 1, mb: 2, display: 'flex', flexDirection: 'column' }}>
                        <PerfectScrollbar
                            ref={scrollbarRef}
                            options={{ suppressScrollX: true }}
                            style={{ width: '100%'}}
                        >
                            <MessageList>
                                {messages.map((message, index) => (
                                    <MessageItem key={index} sender={message.sender}>
                                        <MessageContent sender={message.sender}>
                                            <Typography variant="body1">{message.text}</Typography>
                                        </MessageContent>
                                    </MessageItem>
                                ))}
                                <div ref={messagesEndRef} />
                            </MessageList>
                        </PerfectScrollbar>
                    </Paper>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
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
                            To protect your privacy, this prototype of Project Aura does not store your messages, nor does it have access to your data.
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Card>
        </>
    );
}

export default Chatbot;