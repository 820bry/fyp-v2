import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import CloseIcon from '@mui/icons-material/Close';

// project imports
import AddMoodCard from './AddMoodCard';
import MoodCard from './MoodCard';

import { gridSpacing } from '../../store/constant';
import { emojis } from '../../store/emojis';
import { auth, firestore } from '../../firebase';


const MoodLogging = () => {

    const theme = useTheme();

    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [selected, setSelected] = useState([]);

    // modal
    const [open, setOpen] = useState(false);
    const handleModalOpen = () => setOpen(true);
    const handleModalClose = () => setOpen(false);

    const getEmoji = (value) => {
        const emoji = emojis.find(e => e.value === value);
        return emoji ? emoji.label : null;
    }

    const getTitle = (value) => {
        switch(value) {
            case 1:
                return 'A Very Unpleasant Day';
            case 2:
                return 'An Unpleasant Day';
            case 3:
                return 'A Neutral Day';
            case 4:
                return 'A Pleasant Day';
            case 5:
                return 'A Very Pleasant Day';
            default:
                return '';
        }
    }

    const handleEntrySelect = (data) => {
        setSelected(data);

        handleModalOpen();
    }

    const retrieveData = () => {
        onAuthStateChanged(auth, async user => {
            if(user) {
                const uid = user.uid;
                
                try {
                    await getDocs(collection(firestore, "users", uid, "mood"))
                        .then((data) => {
                            data.forEach((doc) => {
                                setUserData(previous => {
                                    return [...previous, doc.data()];
                                });
                            })
                        });
                        // finished retrieving data
                        const sorted = [...userData].sort((a, b) => {
                            const [dayA, monthA, yearA] = a.date.split('/');
                            const [dayB, monthB, yearB] = b.date.split('/');

                            const dateA = new Date(yearA, monthA - 1, dayA);
                            const dateB = new Date(yearB, monthB - 1, dayB);

                            return dateA - dateB;
                        });
                        // setUserData(sorted);

                        setLoading(false);
                        console.log(userData);

                } catch(e) {
                    console.error(e);
                }
            } else {
                // no user found
                return (<span>no user logon.</span>)
            }
        });
    }


    useEffect(() => {
        retrieveData();
    }, []);

    return (
        <>
        <Modal
            open={open}
            onClose={handleModalClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '65%',
                outline: 'none'
            }}
            >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}
                            border={false}
                            sx={{
                                p: 2,
                                bgcolor: 'primary.dark',
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
                            }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                alignItems: 'right',
                            }}
                            >
                                <IconButton onClick={handleModalClose}
                                    sx={{
                                        color: 'white'
                                    }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                                <Typography sx={{fontSize: '1.0rem'}}>{selected.date}</Typography>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                                <Avatar
                                    variant="rounded"
                                    sx={{
                                        ...theme.typography.commonAvatar,
                                        ...theme.typography.XLAvatar,
                                        bgcolor: 'primary.800',
                                        color: 'grey.100',
                                        mt: 1
                                    }}
                                >
                                {getEmoji(selected.scale)}
                                </Avatar>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                py: 1.5
                            }}
                            >
                                <Box>
                                {selected.feelings?.map((feeling) => (
                                    <Chip label={feeling} sx={{mx: 0.2, my: 0.4, color: 'white'}} />
                                ))}
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                py: 1.5
                            }}
                            >
                                <Typography sx={{fontSize: '1.3rem', fontWeight: '800'}}>{getTitle(selected.scale)}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{backgroundColor: 'white', p: 2}}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            >
                                <Typography sx={{fontSize: '0.9rem', fontWeight: '600'}}>Things impacting your day</Typography>
                            </Box>
                            <Divider sx={{m: 2}}/>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            >
                                <Box>
                                    {selected.impacts?.map((impact) => (
                                        <Chip label={impact} sx={{mx: 0.2, my: 0.4}} />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Slide>
            </Box>
        </Modal>

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
                                Log your daily emotion or mood. Select an existing entry to view more details.
                            </Typography>
                        </Box>
                    </Box>
                    <Divider sx={{borderBottomWidth: 2}} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                            <AddMoodCard />
                        </Grid>
                        {isLoading ? (
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <MoodCard isLoading />
                            </Grid>
                        ):(

                            userData
                            .sort((a, b) => {
                                const [dayA, monthA, yearA] = a.date.split('/');
                                const [dayB, monthB, yearB] = b.date.split('/');
                                
                                const dateA = new Date(yearA, monthA - 1, dayA);
                                const dateB = new Date(yearB, monthB - 1, dayB);
                                
                                return dateB - dateA; 
                            })
                            .map((data) => (
                                <Grid item lg={3} md={6} sm={6} xs={12} key={data.date}>
                                    <MoodCard 
                                        date={data.date}
                                        scale={data.scale}
                                        onClick={() => handleEntrySelect(data)}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>

        </Card>
        </>
    );
};

export default MoodLogging;