import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import LoadingCard from '../../ui-component/cards/Skeleton/LoadingCard';

// assets
import AddIcon from '@mui/icons-material/Add';

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const MoodCard = ({ isLoading }) => {
  const theme = useTheme();

  const handleAdd = (event) => {
    console.log("hello");
  };

  return (
    <>
        {isLoading ? (
            <LoadingCard />
        ) : (
            <MainCard
            border={false}
            content={false}
            onClick={handleAdd}
            sx={{
                cursor: 'pointer',
                bgcolor: 'primary.dark',
                color: '#fff',
                overflow: 'hidden',
                position: 'relative',
                '&:after': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: theme.palette.primary[800],
                borderRadius: '50%',
                top: { xs: -105, sm: -85 },
                right: { xs: -140, sm: -95 }
                },
                '&:before': {
                content: '""',
                position: 'absolute',
                width: 210,
                height: 210,
                background: theme.palette.primary[800],
                borderRadius: '50%',
                top: { xs: -155, sm: -125 },
                right: { xs: -70, sm: -15 },
                opacity: 0.5
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
                                    bgcolor: 'primary.800',
                                    color: 'grey.100',
                                    mt: 1
                                }}
                                >
                                {/* <AddIcon /> */}
                                &#128529;
                                </Avatar>
                            </Grid>

                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                        02/07/2024
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 1.25 }}>
                            <Typography
                            sx={{
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                color: 'primary.200'
                            }}
                            >
                            {/* TODO: Placeholder text but this would show the details of the entry */}
                            Slightly unpleasant day
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        )}
        </>
  );
};

MoodCard.propTypes = {
  isLoading: PropTypes.bool
};

export default MoodCard;
