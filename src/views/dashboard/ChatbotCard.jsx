import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import LoadingCardSlim from '../../ui-component/cards/Skeleton/LoadingCardSlim';

// assets
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

const ChatbotCard = ({ isLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/chat');
    }

    return (
        <>
            {isLoading ? 
            <LoadingCardSlim />
            :
            <CardWrapper border={false} content={false} onClick={handleOnClick}>
                <Box sx={{ p: 1.75 }}>
                    <List sx={{ py: 0 }}>
                        <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                            <ListItemAvatar>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.largeAvatar,
                                        bgcolor: 'warning.light',
                                        color: 'warning.dark',
                                        mt: 1
                                    }}
                                >
                                    <ChatBubbleIcon fontSize="inherit" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ py: 0, my: 0.45 }}
                                primary={
                                    <Typography variant="h4">
                                        Chatbot
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtitle2" sx={{ color: 'grey.500', mt: 0.6 }}>
                                        Talk with a chatbot to get basic information
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Box>
            </CardWrapper>
            }
        </>
    );
};

ChatbotCard.propTypes = {
    isLoading: PropTypes.bool
}

export default ChatbotCard;