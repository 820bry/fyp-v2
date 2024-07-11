import { useState, useEffect } from 'react';

// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import AnimateButton from '../../ui-component/extended/AnimateButton';
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';
import { gridSpacing } from '../../store/constant';





const Assessment = () => {

    const [scores, setScores] = useState(Array(22).fill(null));
    const [started, setStarted] = useState(false);

    const handleRadioBtn = (index, value) => {
        // console.log("Question " + index + ": " + value);

        const current = [...scores];
        current[index - 1] = parseInt(value); 
        setScores(current);
    }

    const handleSubmit = () => {
        const total = scores.reduce((acc, curr) => acc + (curr !== null ? curr : 0), 0);

        console.log(scores);
        // console.log(total);
    }

    const startPage = (

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sx={{m: 2}}>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <Box sx={{ color: 'inherit' }}>
                        <Typography variant="h1">Mental Health Assessment</Typography>
                            <Typography 
                            variant="body1"
                            fontSize="1.1rem"
                            sx={{
                                py: 1.5
                            }}
                        >
                            Take a mental health assessment to better understand the state of your mental health.
                        </Typography>
                    </Box>
                </Box>
            </Grid>
    
            <Grid item xs={12}>
                <Box sx={{ mt: 2, px: '10%' }}>
                    <AnimateButton>
                        <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => setStarted(true)}>
                            Start Assessment
                        </Button>   
                    </AnimateButton>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{mx: 2}}>
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <Typography
                    variant="body1"
                    fontSize="0.8rem"
                    color="grey.500"
                    >
                        This assessment is not intended to be an accurate intepretation of your mental health.
                        <Box fontWeight="600" display='inline'> Please seek professional help for proper diagnosis.</Box>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );

    const questions = (
        <>
        <MainCard title="General Mood and Emotions" sx={{my:2}}>
            <SubCard title="Question 1 - How have you been feeling emotionally in the past week?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="1" id="1" onChange={(e, val) => handleRadioBtn(1, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Very happy" />
                        <FormControlLabel value="1" control={<Radio />} label="Happy" />
                        <FormControlLabel value="2" control={<Radio />} label="Neutral" />
                        <FormControlLabel value="3" control={<Radio />} label="Sad" />
                        <FormControlLabel value="4" control={<Radio />} label="Very sad" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 2 - Have you been feeling down, depressed, or hopeless?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="2" id="2" onChange={(e, val) => handleRadioBtn(2, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 3 - Have you experienced any mood swings or sudden changes in your mood?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="3" id="3" onChange={(e, val) => handleRadioBtn(3, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Anxiety and Stress" sx={{my:2}}>
            <SubCard title="Question 4 - Have you been feeling nervous, anxious, or on edge?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="4" id="4" onChange={(e, val) => handleRadioBtn(4, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 5 - Do you find it hard to control your worrying?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="5" id="5" onChange={(e, val) => handleRadioBtn(5, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl>
            </SubCard>
            <SubCard title="Question 6 - Have you been experiencing excessive stress in your daily life?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="6" id="6" onChange={(e, val) => handleRadioBtn(6, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Sleep Patterns" sx={{my:2}}>
            <SubCard title="Question 7 - How has your sleep been recently?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="7" id="7" onChange={(e, val) => handleRadioBtn(7, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Very good" />
                        <FormControlLabel value="1" control={<Radio />} label="Good" />
                        <FormControlLabel value="2" control={<Radio />} label="Fair" />
                        <FormControlLabel value="3" control={<Radio />} label="Poor" />
                        <FormControlLabel value="4" control={<Radio />} label="Very poor" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 8 - Do you feel rested when you wake up in the morning?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="8" id="8" onChange={(e, val) => handleRadioBtn(8, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Always" />
                        <FormControlLabel value="1" control={<Radio />} label="Often" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="4" control={<Radio />} label="Never" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Energy and Fatigue" sx={{my:2}}>
            <SubCard title="Question 9 - Have you been feeling more tired or lacking energy lately?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="9" id="9" onChange={(e, val) => handleRadioBtn(9, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 10 - Do you find it difficult to get motivated or complete daily tasks?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="10" id="10" onChange={(e, val) => handleRadioBtn(10, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Concentration and Memory" sx={{my:2}}>
            <SubCard title="Question 11 - Have you had trouble concentrating or making decisions?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="11" id="11" onChange={(e, val) => handleRadioBtn(11, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 12 - Do you find yourself forgetting things more often?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="12" id="12" onChange={(e, val) => handleRadioBtn(12, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Appetite and Eating Habits" sx={{my:2}}>
            <SubCard title="Question 13 - Have you experienced any changes in your appetite or weight?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="13" id="13" onChange={(e, val) => handleRadioBtn(13, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="No change" />
                        <FormControlLabel value="1" control={<Radio />} label="Increased appetite and/or weight" />
                        <FormControlLabel value="2" control={<Radio />} label="Decreased appetite and/or weight" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 14 - Do you find yourself eating too much or too little?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="14" id="14" onChange={(e, val) => handleRadioBtn(14, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Social Interaction" sx={{my:2}}>
            <SubCard title="Question 15 - Have you been withdrawing from friends or family?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="15" id="15" onChange={(e, val) => handleRadioBtn(15, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 16 - Do you feel lonely or isolated?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="16" id="16" onChange={(e, val) => handleRadioBtn(16, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Interest and Pleasure" sx={{my:2}}>
            <SubCard title="Question 17 - Have you lost interest or pleasure in activities you used to enjoy?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="17" id="17" onChange={(e, val) => handleRadioBtn(17, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 18 - Do you feel a lack of enthusiasm or excitement about life?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="18" id="18" onChange={(e, val) => handleRadioBtn(18, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Thoughts and Feelings" sx={{my:2}}>
            <SubCard title="Question 19 - Have you had any thoughts of harming yourself or others?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="19" id="19" onChange={(e, val) => handleRadioBtn(19, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Often" />
                        <FormControlLabel value="4" control={<Radio />} label="Always" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 20 - Have you been feeling guilty or worthless?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="20" id="20" onChange={(e, val) => handleRadioBtn(20, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        <MainCard title="Coping and Resilience" sx={{my:2}}>
            <SubCard title="Question 21 - How do you usually cope with stress or difficult situations?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="21" id="21" onChange={(e, val) => handleRadioBtn(21, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Very well" />
                        <FormControlLabel value="1" control={<Radio />} label="Well" />
                        <FormControlLabel value="2" control={<Radio />} label="Fair" />
                        <FormControlLabel value="3" control={<Radio />} label="Poorly" />
                        <FormControlLabel value="4" control={<Radio />} label="Very poorly" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Question 22 - Do you feel that you have enough support from friends or family?" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="22" id="22" onChange={(e, val) => handleRadioBtn(22, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Always" />
                        <FormControlLabel value="1" control={<Radio />} label="Often" />
                        <FormControlLabel value="2" control={<Radio />} label="Sometimes" />
                        <FormControlLabel value="3" control={<Radio />} label="Rarely" />
                        <FormControlLabel value="4" control={<Radio />} label="Never" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
        </MainCard>
        
        <Grid item xs={12} sx={{mx: 2}}>
            <Box sx={{ m: 3, px: '10%' }}>
                <AnimateButton>
                    <Button fullWidth size="large" type="submit" variant="contained" color="secondary" onClick={() => handleSubmit()}>
                        See Results
                    </Button>   
                </AnimateButton>
            </Box>
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <Typography
                variant="body1"
                fontSize="0.8rem"
                color="grey.500"
                textAlign="center"
                >
                    The answers you provide will not be stored or shared.
                </Typography>
            </Box>
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
            px:'5%',
            py: 3
        }}
        >
            {started ? questions : startPage}
        </Card>
        </>
    )
}

export default Assessment;