import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Snackbar from '@mui/material/Snackbar';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { gridSpacing } from '../../../store/constant';
import { emojis } from '../../../store/emojis';
import { auth, firestore } from '../../../firebase';
import { getDate, getTime, getDateAndTime } from '../../../utils/dateandtime';

const AddEntry = () => {

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [sbMsg, setSbMsg] = useState('');

    const [emoji, setEmoji] = useState(3);
    const [feelings, setFeelings] = useState([]);
    const [impacts, setImpacts] = useState([]);

    // handles page switching
    const renderContent = (page) => {
        switch(page) {
            case 1:
                return page1;
            case 2:
                return page2;
            case 3:
                return page3;
            default:
                // it technically shouldn't be able to reach here, but just in case..
                return (<span>error</span>);
        }
    }

    // handles updating on selecting feelings
    const handleFeelingSelect = (value) => {
        setFeelings(prevSelected => {
            if(prevSelected.includes(value)) {
                return prevSelected.filter(feelings => feelings !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    }

    // handles updating on selecting impacts
    const handleImpactSelect = (value) => {
        setImpacts(prevSelected => {
            if(prevSelected.includes(value)) {
                return prevSelected.filter(feelings => feelings !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    }

    const handleSubmit = () => {
        console.log(emoji + " " + feelings + " " + impacts);
        console.log(getTime());

        onAuthStateChanged(auth, user => {
            if(user) {
                const uid = user.uid;
                const date = getDate(), time = getTime();

                try {
                    const userMoodRef = collection(firestore, "users", uid, "mood");
                    setDoc(doc(userMoodRef), {
                        date: date,
                        time: time,
                        scale: emoji,
                        feelings: feelings,
                        impacts: impacts
                    });

                    navigate('/logging');

                } catch(e) {
                    console.error("Error while writing user to firestore: ", e);
                    setSbMsg("Error while saving mood entry");
                    setOpen(true);
                }

            } else {
                // no user found
                setSbMsg("No user logon. Please try logging in again.");
                setOpen(true);
            }
        });

    }
    
    const feelingChoices = [
        "Happy", "Joyful", "Excited", "Content", "Relaxed", "Confident", "Grateful",
        "Hopeful", "Inspired", "Proud", "Energetic", "Peaceful", "Loved", "Amused",
        "Optimistic", "Calm", "Neutral", "Indifferent", "Bored", "Tired", "Sad",
        "Anxious", "Angry", "Frustrated", "Lonely", "Overwhelmed", "Stressed",
        "Depressed", "Annoyed", "Guilty", "Jealous", "Hurt", "Disappointed", "Scared",
        "Ashamed", "Conflicted", "Nostalgic", "Melancholic", "Pensive", "Resentful"
    ];

    const impactChoices = [
        "Health", "Sleep", "Diet", "Exercise", "Illness", "Medication", "Fatigue",
        "Hydration", "Pain", "Chronic conditions", "Weather", "Noise", "Lighting",
        "Temperature", "Cleanliness", "Crowds", "Pollution", "Workspace", "Home environment",
        "Natural surroundings", "Relationships", "Family", "Friends", "Colleagues",
        "Social support", "Loneliness", "Conflict", "Communication", "Social media",
        "Community", "Work", "School", "Finances", "Responsibilities", "Deadlines",
        "Travel", "Major life events", "Routine changes", "Commuting", "Schedule",
        "Stress", "Anxiety", "Depression", "Self-esteem", "Motivation", "Cognitive load",
        "Personal goals", "Past experiences", "Mental health conditions", "Therapy",
        "Hobbies", "Leisure activities", "Work-life balance", "Recreation", "Interests",
        "Learning", "Cultural activities", "Volunteering", "Entertainment", "Creativity",
        "News", "Technology use", "Financial status", "Time management", "Achievements",
        "Failures", "Opportunities", "Losses", "Gains", "Surprises"
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
                aria-label="emoji"
                defaultValue={emoji}
                step={1}
                min={1}
                max={5}
                marks={emojis}
                color="secondary"
                onChange={ (e, val) => setEmoji(val) }
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
            <Box sx={{backgroundColor: 'grey.300', borderRadius: '20px', p: 2}}>
                {feelingChoices.map((feeling) => (
                    <Chip 
                        key={feeling} 
                        label={feeling} 
                        variant={feelings.includes(feeling) ? "contained" : "outlined"}
                        color={feelings.includes(feeling) ? "secondary" : "info"}
                        onClick={() => handleFeelingSelect(feeling)}
                        sx={{
                            mx: 0.2,
                            my: 0.5
                        }}
                    />
                ))}
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ mt: 1 }}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => {setPage(1);}}>
                                Back
                            </Button>
                        </AnimateButton>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ mt: 1 }}>
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

    const page3 = (
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
                    <Typography variant="h1">What's having the biggest impact on you today?</Typography>
                    <Typography 
                        variant="body1"
                        fontSize="1.1rem"
                        sx={{
                            py: 1.5
                        }}
                    >
                        Choose the words from the list below on what's impacting how you feel today?.
                    </Typography>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Box sx={{backgroundColor: 'grey.300', borderRadius: '20px', p: 1.8}}>
                {impactChoices.map((impact) => (
                    <Chip 
                        key={impact} 
                        label={impact} 
                        variant={impacts.includes(impact) ? "contained" : "outlined"}
                        color={impacts.includes(impact) ? "secondary" : "info"}
                        onClick={() => handleImpactSelect(impact)}
                        sx={{
                            mx: 0.2,
                            my: 0.5
                        }}
                    />
                ))}
            </Box>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ mt: 1 }}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => {setPage(2);}}>
                                Back
                            </Button>
                        </AnimateButton>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ mt: 1 }}>
                        <AnimateButton>
                            <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={handleSubmit}> 
                                Finish
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
            px: '7%',
            py: 5
        }}
        >
            <Grid container spacing={gridSpacing}>{renderContent(page)}</Grid>
        </Card>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message={sbMsg}
        />
        </>
    );
}

export default AddEntry;