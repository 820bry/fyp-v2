import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import { styled, keyframes } from '@mui/system';

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

const expand = keyframes`
    from { transform: scale(1); }
    to { transform: scale(1.1); }
`;

const contract = keyframes`
    from { transform: scale(1.1); }
    to { transform: scale(1); }
`;

const Circle = styled(Box)(( { theme, phase }) => ({
    width: 250,
    height: 250,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 1s ease-in-out',
    cursor: 'pointer',
    ...(phase === 'idle' && {
        backgroundColor: theme.palette.grey[300],
        animation: `${pulse} 8s infinite`,
    }),
    ...(phase === 'guide' && {
        backgroundColor: theme.palette.grey[300],
        animation: `${pulse} 8s infinite`,
    }),
    ...(phase === 'completed' && {
        backgroundColor: theme.palette.grey[300],
        animation: `${pulse} 8s infinite`,
    }),
    ...(phase === 'inhale' && {
        backgroundColor: theme.palette.success.main,
        animation: `${expand} 4s linear forwards`,
    }),
    ...(phase === 'hold' && {
        backgroundColor: theme.palette.primary.main,
        transform: 'scale(1.1)',
    }),
    ...(phase === 'exhale' && {
        backgroundColor: theme.palette.warning.main,
        animation: `${contract} 4s linear forwards`,
    }),
    ...(phase === 'pause' && {
        backgroundColor: theme.palette.grey[300],
        transform: 'scale(1)',
    }),
}));

const InnerCircle = styled(Box)(({ theme }) => ({
    width: 230,
    height: 230,
    borderRadius: '50%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Exercise = () => {

    const [phase, setPhase] = useState('idle');
    const [counter, setCounter] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [instruction, setInstruction] = useState("Click the circle to start.");
    const [fadeIn, setFadeIn] = useState(true);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setCounter((prevCounter) => {
                    if (prevCounter <= 1) {
                        setPhase((prevPhase) => {
                            switch (prevPhase) {
                                case 'guide':
                                    return 'inhale';
                                case 'inhale':
                                    return 'hold';
                                case 'hold':
                                    return 'exhale';
                                case 'exhale':
                                    return 'pause';
                                case 'pause':
                                    setCycleCount((prev) => prev + 1);
                                    return 'inhale';
                                default:
                                    return 'inhale';
                            }
                        });

                        return 4; // Reset counter to 4 for each phase
                    }
                    return prevCounter - 1;
                });
            }, 1000);
        }
    
        return () => clearInterval(timer);
    }, [isRunning]);

    useEffect(() => {
        if(cycleCount >= 6) {
            setIsRunning(false);
            setPhase('completed');
        }
    }, [cycleCount]);

    useEffect(() => {
        setFadeIn(false);
        const timer = setTimeout(() => {
            setInstruction(getInstructions());
            setFadeIn(true);
        }, 500);
    }, [phase, cycleCount]);

    const handleClick = () => {
        if(phase === 'idle') {
            setPhase('guide');
            setIsRunning(true);
            setCounter(10);
        } else if(phase === 'completed') {
            setPhase('idle');
            setCycleCount(0);
            setIsRunning(false);
        } else if(isRunning) {
            setIsRunning(false);
            setPhase('idle');
            setCounter(10);
            setCycleCount(0);
        }
    }

    const getInstructions = () => {
        switch(phase) {
            case 'guide':
                return "Take a moment to calm down and focus on your breathing.";
            case 'idle':
                return "Click to start";
            case 'inhale':
                return "Breathe in...";
            case 'exhale':
                return "Breathe out...";
            case 'completed':
                return "Exercise completed. Great job! Click again to restart.";
            default: 
                return "";
        }
    }

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
            
            <Container maxWidth="sm">
                <Box
                    sx={{
                        height: '75vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Circle phase={phase} onClick={handleClick}>
                        <InnerCircle>
                            {phase === 'idle' ? <Typography variant="body1" sx={{fontWeight: 'bold'}}>Tap to Start</Typography> : 
                             phase === 'completed'? <Typography variant="body1">Tap to Start Again</Typography> :
                             <Typography variant="body1" sx={{color: 'grey'}}>Tap to Stop</Typography>}
                        </InnerCircle>
                    </Circle>
                    <Box
                        sx={{
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Fade in={fadeIn} timeout={1000}>
                            <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>
                                {instruction}
                            </Typography>
                        </Fade>
                    </Box>
                    {/* {isRunning && phase !== 'guide' && (
                    <Typography variant="body1" sx={{ mt: 1 }}>
                        Cycle: {cycleCount + 1} / 6
                    </Typography>
                    )} */}
                </Box>
            </Container>

        </Card>
        </>
    );
}

export default Exercise;