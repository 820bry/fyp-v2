import { useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../store/constant';





const AddEntry = () => {

    const [page, setPage] = useState(1);

    function renderContent(page) {
        switch(page) {
            case 1:
                return page1;
            case 2:
                return page2;
            default:
                return (<span>error</span>);
        }
    }

    const emojis = [
        {
            value: 1,
            label: '😞'
        },
        {
            value: 2,
            label: '🙁'
        },
        {
            value: 3,
            label: '😐'
        },
        {
            value: 4,
            label: '🙂'
        },
        {
            value: 5,
            label: '😀'
        },
    ];
    
    const feelings = [
        "Happy", "Joyful", "Excited", "Content", "Relaxed", "Confident", "Grateful",
        "Hopeful", "Inspired", "Proud", "Energetic", "Peaceful", "Loved", "Amused",
        "Optimistic", "Calm", "Neutral", "Indifferent", "Bored", "Tired", "Sad",
        "Anxious", "Angry", "Frustrated", "Lonely", "Overwhelmed", "Stressed",
        "Depressed", "Annoyed", "Guilty", "Jealous", "Hurt", "Disappointed", "Scared",
        "Ashamed", "Conflicted", "Nostalgic", "Melancholic", "Pensive", "Resentful"
    ];
    
    const page1 = (
        <>
        <Grid item xs={12}>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <Box sx={{ color: 'inherit' }}>
                    <Typography variant="h1">How have you felt today?</Typography>
                    <Typography 
                        variant="body1"
                        fontSize="1.1rem"
                        sx={{
                            py: 1.5
                        }}
                    >
                        Choose the emoji that best describes how you've felt today as a whole.
                    </Typography>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Slider
                aria-label="feeling"
                defaultValue={3}
                step={1}
                min={1}
                max={5}
                marks={emojis}
                color="secondary"
            />
        </Grid>
        <Grid item xs={12}>
            <Box sx={{ mt: 2, px: '20%' }}>
                <AnimateButton>
                    <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => {setPage(2);}}>
                        Continue
                    </Button>
                </AnimateButton>
            </Box>
        </Grid>
        </>
    );
    
    const page2 = (
        <>
        <Grid item xs={12}>
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <Box sx={{ color: 'inherit' }}>
                    <Typography variant="h1">Describe how you feel</Typography>
                    <Typography 
                        variant="body1"
                        fontSize="1.1rem"
                        sx={{
                            py: 1.5
                        }}
                    >
                        Choose the words from the list below that best describes how you've felt today.
                    </Typography>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box sx={{backgroundColor: 'grey.300', borderRadius: '20px', p: 3}}>
                {feelings.map((feeling) => (
                    <Chip key={feeling} label={feeling} variant="outlined" />
                ))}
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => {setPage(1);}}>
                                Back
                            </Button>
                        </AnimateButton>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ mt: 2}}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => {setPage(3);}}>
                                Continue
                            </Button>
                        </AnimateButton>
                    </Box>
                </Grid>
            </Grid>
    
        </Grid>
        </>  
    );

    return (
        <>
        <Card sx={{ 
            mb: 3, 
            boxShadow: 6,
            bgcolor: 'grey.100',
            color: 'black',
            px: '12%',
            py: 10
        }}
        >
            <Grid container spacing={gridSpacing}>{renderContent(page)}</Grid>
        </Card>
        </>
    );
}

export default AddEntry;