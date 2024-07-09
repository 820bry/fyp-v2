import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

// project imports
import AddMoodCard from './AddMoodCard';
import MoodCard from './MoodCard';

import { gridSpacing } from '../../store/constant';
import { auth, firestore } from '../../firebase';


const MoodLogging = () => {

    const [isLoading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);

    const retrieveData = () => {
        onAuthStateChanged(auth, async user => {
            if(user) {
                const uid = user.uid;
                
                try {
                    await getDocs(collection(firestore, "users", uid, "mood"))
                        .then((data) => {
                            data.forEach((doc) => {
                                console.log(doc.data());
                                setUserData(previous => {
                                    return [...previous, doc.data()];
                                });
                            })
                        });
                        // finished retrieving data
                        setLoading(false);

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
                        {isLoading ? (
                            <Grid item lg={3} md={6} sm={6} xs={12}>
                                <MoodCard isLoading />
                            </Grid>
                        ):(
                            userData.map((data) => (
                                <Grid item lg={3} md={6} sm={6} xs={12}>
                                    <MoodCard 
                                        key={data.id}
                                        date={data.date}
                                        scale={data.scale}
                                    />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>

        </Card>
    );
};

export default MoodLogging;