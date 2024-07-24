import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import PhonelinkIcon from '@mui/icons-material/Phonelink';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const items = [
    {
        icon: <PhonelinkIcon />,
        title: 'Cross Platform',
        description: 'Designed to be easily accessible across different platforms and devices.'
    },
    {
        icon: <TouchAppIcon />,
        title: 'Simple to Use',
        description: 'MentalQuest provides straightforward features for basic mental healthcare.'
    },
    {
        icon: <ThumbUpIcon />,
        title: 'Intuitive User Experience',
        description: 'Simple to use interface with detailed guidance and information.'
    },
]

const Highlights = () => {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                bgcolor: '#b6fcdc',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h1" variant="h1">
                        Highlights
                    </Typography>
                    <Typography variant="body1" sx={{ py: 1.5, color: 'grey.800' }}>
                        See how MentalQuest is designed to provide accessible mental healthcare to an even broader audience.
                    </Typography>
                </Box>
                <Grid container spacing={2.5}>
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Stack
                                direction="column"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    boxShadow: 3,
                                    p: 3,
                                    height: '100%',
                                    background: 'transparent',
                                    backgroundColor: '#53eda7',
                                }}
                            >
                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                <div>
                                <Typography fontWeight="medium" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2">
                                    {item.description}
                                </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default Highlights;