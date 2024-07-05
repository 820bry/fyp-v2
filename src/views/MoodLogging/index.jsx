import { useState, useEffect } from 'react';

// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

// project imports
import AddMoodCard from './AddMoodCard';
import MoodCard from './MoodCard';

import { gridSpacing } from '../../store/constant';



const MoodLogging = () => {

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(false);
    }, []);

    return (
        <Card sx={{ 
            mb: 3, 
            boxShadow: 6,
            bgcolor: 'grey.100',
            color: 'black',
            p: 5
        }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex' }} >
                        <Box sx={{ color: 'inherit' }}>
                            <Typography variant="h1">Mood Logging</Typography>
                            <Typography 
                                variant="body1"
                                fontSize="1.1rem"
                                sx={{
                                    py: 1.5
                                }}
                            >
                                Log your current emotion or mood. 
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <AddMoodCard />
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <MoodCard />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Card>
    );
};

export default MoodLogging;