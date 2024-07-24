import * as React from 'react';

import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import BookIcon from '@mui/icons-material/Book';
import AirIcon from '@mui/icons-material/Air';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const items = [
    {
        icon: <BookIcon />,
        title: 'Mood Analysis',
        description: 'MentalQuest provides basic analysis of your mood and emotions so you can better understand trends in how you feel.',
        image: 'url("/src/assets/landing/analysis.png")'
    },
    {
        icon: <AirIcon />,
        title: 'Mental Health Exercises',
        description: 'Exercises such as breathing can help with calming yourself and relaxing your mind.',
        image: 'url("/src/assets/landing/breathing.png")'
    },
    {
        icon: <ChatBubbleIcon />,
        title: 'Chatbot',
        description: 'Not sure what kind of help you need? Our chatbot can help identify your issue and provide relevant resources.',
        image: 'url("/src/assets/landing/chatbot.png")'
    }
];

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index) => {
        setSelectedItemIndex(index);
    };

    const selectedFeature = items[selectedItemIndex];

    return (
        <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
            <div>
                <Typography component="h1" variant="h1" color="text.primary">
                Product Features
                </Typography>
                <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: { xs: 2, sm: 4 }, py: 1.5 }}
                >
                Here are some of the key mental healthcare features that MentalQuest provides.
                </Typography>
            </div>
            <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
                {items.map(({ title }, index) => (
                <Chip
                    key={index}
                    label={title}
                    onClick={() => handleItemClick(index)}
                    sx={{
                    borderColor: () => {
                        return selectedItemIndex === index ? 'secondary.light' : '';
                    },
                    background: () => {
                        return selectedItemIndex === index ? 'none' : '';
                    },
                    backgroundColor: selectedItemIndex === index ? 'secondary.main' : '',
                    '& .MuiChip-label': {
                        color: selectedItemIndex === index ? '#fff' : '',
                    },
                    }}
                />
                ))}
            </Grid>
            <Box
                component={Card}
                variant="outlined"
                sx={{
                display: { xs: 'auto', sm: 'none' },
                mt: 4,
                p: 2
                }}
            >
                <Box
                sx={{
                    backgroundImage: items[selectedItemIndex].image,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: 280,
                }}
                />
                <Box sx={{ px: 2, py: 2 }}>
                <Typography color="text.primary" variant="body2" fontWeight="bold">
                    {selectedFeature.title}
                </Typography>
                <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                    {selectedFeature.description}
                </Typography>
                </Box>
            </Box>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                useFlexGap
                sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
            >
                {items.map(({ icon, title, description }, index) => (
                <Card
                    disableRipple
                    key={index}
                    variant="outlined"
                    component={Button}
                    onClick={() => handleItemClick(index)}
                    sx={{
                    p: 3,
                    height: 'fit-content',
                    width: '100%',
                    background: 'none',
                    backgroundColor:
                        selectedItemIndex === index ? 'action.selected' : undefined,
                    }}
                >
                    <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        textAlign: 'left',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { md: 'center' },
                        gap: 2.5,
                    }}
                    >
                    <Box
                        sx={{
                        color: () => {
                            return selectedItemIndex === index
                            ? 'secondary.main'
                            : 'grey.700';
                        },
                        }}
                    >
                        {icon}
                    </Box>
                    <Box sx={{ textTransform: 'none' }}>
                        <Typography
                        color="text.primary"
                        variant="body2"
                        fontWeight="bold"
                        >
                        {title}
                        </Typography>
                        <Typography
                        color="text.secondary"
                        variant="body2"
                        sx={{ my: 0.5 }}
                        >
                        {description}
                        </Typography>
                    </Box>
                    </Box>
                </Card>
                ))}
            </Stack>
            </Grid>
            <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
            >
            <Card
                variant="outlined"
                sx={{
                height: '100%',
                width: '100%',
                display: { xs: 'none', sm: 'flex' },
                pointerEvents: 'none',
                }}
            >
                <Box
                sx={{
                    m: 'auto',
                    width: 500,
                    height: 580,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundImage: items[selectedItemIndex].image,
                    backgroundRepeat: 'no-repeat'
                }}
                />
            </Card>
            </Grid>
        </Grid>
        </Container>
    );
}