import { useEffect, useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';

// material-ui
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiTypography from '@mui/material/Typography';

// project imports
import ImpactChart from './ImpactChart';
import MoodChart from './MoodChart';

import MoodLoggingCard from './MoodLoggingCard';
import AssessmentCard from './AssessmentCard';
import ExerciseCard from './ExerciseCard';
import ChatbotCard from './ChatbotCard';

import LoadingChartCard from '../../ui-component/cards/Skeleton/LoadingChartCard';
import { gridSpacing } from '../../store/constant';
import { auth, firestore } from '../../firebase';
import { analyzeMoodData } from './data/data';


const Dashboard = () => {
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [gradient, setGradient] = useState('');

  const [firstName, setFirstName] = useState('');

  const hour = new Date().getHours();

  useEffect(() => {

    const updateBackground = () => {
      let gradientColors;

      if(hour >= 5 && hour < 12) { // Morning
        gradientColors = ['#FFFACD', '#87CEEB'];
      } else if(hour >= 12 && hour < 17) { // Afternoon
        gradientColors = ['#FFFACD', '#FFDAB9'];
      } else if(hour >= 17 && hour < 20) { // Evening
        gradientColors = ['#FFDAB9', '#E6E6FA'];
      } else { // Night
        gradientColors = ['#E6E6FA', '#9696e8'];
      }

      setGradient(`linear-gradient(to bottom, ${gradientColors[0]}, ${gradientColors[1]})`);
    };
    updateBackground();


    const fetchData = async(uid) => {
      const querySnapshot = await getDocs(collection(firestore, "users", uid, "mood"));
      const userData = querySnapshot.docs.map(doc => doc.data());
      return analyzeMoodData(userData);
    }

    onAuthStateChanged(auth, async user => {
      
      const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setFirstName(docSnap.data().firstName);
      }

      const data = await fetchData(user.uid);
      setAnalysis(data);
      setLoading(false);
    })
    
  }, []);

  return (

    <Card sx={{ 
        mb: 3, 
        boxShadow: 6,
        background: gradient,
        color: 'black',
        px: '6%',
        py: 5
    }}
    >
      {
        !isLoading &&
        <MuiTypography variant="h1" gutterBottom sx={{ pb: 2.5, lineHeight: 1.3 }}>
        {hour >= 5 && hour < 12 ? 'Good Morning' :
         hour >= 12 && hour < 18 ? 'Good Afternoon' :
         'Good Evening'}
         , {firstName}
        </MuiTypography>
      }
      <Grid container spacing={gridSpacing} sx={{py: 2.5}}>
        <Grid item xs={12} md={6}>
          { isLoading ? <LoadingChartCard /> : <MoodChart data={analysis.daily_mood} /> }
        </Grid>
        <Grid item xs={12} md={6}>
          { isLoading ? <LoadingChartCard /> : <ImpactChart data={analysis.impact_frequency} /> }
        </Grid>
      </Grid>
      <Grid container spacing={gridSpacing} sx={{py: 2.5}}>
        <Grid item xs={12} md={12}>
          <Divider>
            <Typography variant="h2">Explore MentalQuest</Typography>
          </Divider>
        </Grid>
      </Grid>
      <Grid container spacing={gridSpacing} sx={{py: 2.5}}>
        <Grid item xs={12} md={6} sm={6} lg={4}>
          <MoodLoggingCard isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={6} sm={6} lg={4}>
          <AssessmentCard isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={12} sm={12} lg={4}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6} sm={6} lg={12}>
              <ExerciseCard isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6} sm={6} lg={12}>
              <ChatbotCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>


  );
};

export default Dashboard;
