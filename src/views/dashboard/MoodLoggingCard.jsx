import React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import LoadingCard from '../../ui-component/cards/Skeleton/LoadingCard';

// assets
import BookIcon from '@mui/icons-material/Book';

const MoodLoggingCard = ({ isLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate();
  
    const handleOnClick = () => {
        navigate('/logging');
    };

    return (
        <>
        {isLoading ? 
        <LoadingCard />
        :
        <MainCard
            border={false}
            content={false}
            onClick={handleOnClick}
            sx={{
                cursor: 'pointer',
                bgcolor: 'secondary.dark',
                color: '#fff',
                overflow: 'hidden',
                position: 'relative',
                '&>div': {
                    position: 'relative',
                    zIndex: 5
                },
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: 210,
                    height: 210,
                    background: theme.palette.secondary[800],
                    borderRadius: '50%',
                    top: { xs: -105, sm: -85 },
                    right: { xs: -140, sm: -95 },
                },
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: 210,
                    height: 210,
                    background: theme.palette.secondary[800],
                    borderRadius: '50%',
                    top: { xs: -155, sm: -125 },
                    right: { xs: -70, sm: -15 },
                    opacity: 0.5,
                }
            }}
        >
            <Box sx={{ p: 2.25 }}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.largeAvatar,
                                    bgcolor: 'secondary.800',
                                    color: 'grey.100',
                                    mt: 1
                                    }}
                                >
                                    <BookIcon fontSize="inherit" />
                                </Avatar>
                            </Grid>

                        </Grid>
                        </Grid>
                    <Grid item>
                        <Grid container alignItems="center">
                            <Grid item>
                                <Typography sx={{ fontSize: '2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, zIndex: 5 }}>Mood Logging</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ mb: 1.25 }}>
                        <Typography
                            sx={{
                            fontSize: '1.1rem',
                            fontWeight: 500,
                            color: 'secondary.200'
                            }}
                        >
                            Log or view your mood entries
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
        }
        </>
    );
}

export default MoodLoggingCard;