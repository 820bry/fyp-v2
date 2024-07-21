import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

    /*
    Questions 1-9: Patient Health Questionnaires PHQ-9 (Depressive Diagnosis)
    Questions 10-16: General Anxiety Disorder GAD-7 (Anxiety Diagnosis)

    PHQ-9 total: 27
    > 1-4: Minimal
    > 5-9: Mild
    > 10-14: Moderate
    > 15-19: Moderately Severe
    > 20-27: Severe

    GAD-7 total: 21
    > 0-4: Minimal
    > 5-9: Mild
    > 10-14: Moderate
    > 15-21: Severe

    total total: 48
    (each score is stored in array index-1 because array starts at 0)
    */
    const [scores, setScores] = useState(Array(15).fill(null));
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
        console.log(total);

        navigate('/assessment/summary', { state: { scores } });
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
                        This assessment is created based on the PHQ-9 and GAD-7 guidelines. 
                        It should not be taken as an accurate intepretation of your mental health.
                        <Box fontWeight="600" display='inline'> Please seek professional help for proper diagnosis.</Box>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );

    const questions = (
        <>
        <MainCard title="Over the last two weeks, how often have you been bothered by the following problems?" sx={{my:2}}>
            <SubCard title="Little interest or pleasure in doing things" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="1" id="1" onChange={(e, val) => handleRadioBtn(1, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Feeling down, depressed, or hopeless" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="2" id="2" onChange={(e, val) => handleRadioBtn(2, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Trouble falling or staying asleep, or sleeping too much" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="3" id="3" onChange={(e, val) => handleRadioBtn(3, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Feeling tired or having little energy" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="4" id="4" onChange={(e, val) => handleRadioBtn(4, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Poor appetite or overeating" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="5" id="5" onChange={(e, val) => handleRadioBtn(5, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl>
            </SubCard>
            <SubCard title="Feeling about yourself, or that you are a failure or have let yourself or your family down" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="6" id="6" onChange={(e, val) => handleRadioBtn(6, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Trouble concentrating on things, such as reading the newspaper, or watching television" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="7" id="7" onChange={(e, val) => handleRadioBtn(7, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Moving or speaking so slowly that other people could have noticed. Or the opposite - being so figety or restless that you have been moving around a lot more than usual" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="8" id="8" onChange={(e, val) => handleRadioBtn(8, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Thought that you would be better off dead, or of hurting yourself" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="9" id="9" onChange={(e, val) => handleRadioBtn(9, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Feeling nervous, anxious, or on edge" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="10" id="10" onChange={(e, val) => handleRadioBtn(10, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Not being able to stop or control worrying" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="11" id="11" onChange={(e, val) => handleRadioBtn(11, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Worrying too much about different things" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="12" id="12" onChange={(e, val) => handleRadioBtn(12, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Trouble relaxing" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="13" id="13" onChange={(e, val) => handleRadioBtn(13, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Being so restless that it is hard to sit still" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="14" id="14" onChange={(e, val) => handleRadioBtn(14, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Becoming easily annoyed or irritable" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="15" id="15" onChange={(e, val) => handleRadioBtn(15, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
                    </RadioGroup>
                </FormControl> 
            </SubCard>
            <SubCard title="Feeling afraid, as if something awaful" sx={{my:2}}>
                <FormControl>
                    <RadioGroup name="16" id="16" onChange={(e, val) => handleRadioBtn(16, val)}>
                        <FormControlLabel value="0" control={<Radio />} label="Not at all" />
                        <FormControlLabel value="1" control={<Radio />} label="Several days" />
                        <FormControlLabel value="2" control={<Radio />} label="More than half the days" />
                        <FormControlLabel value="3" control={<Radio />} label="Nearly every day" />
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