// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import SubCard from '../../ui-component/cards/SubCard';

import { gridSpacing } from '../../store/constant';

const MoodLogging = () => (
    <Card sx={{ mb: 3, boxShadow: 6 }}>
      <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 4.5,
            bgcolor: 'grey.200',
            color: 'black'
        }}
      >
        <Box 
            sx={{ 
                color: 'inherit',
                alignItems: 'center'
            }}
        >
            <Typography variant="h1">Mood Logging</Typography>
            <Typography 
                variant="body2"
                sx={{
                    py: 1.5
                }}
            >
                Log your current emotion or mood. 
            </Typography>
        </Box>
      </Box>
    </Card>
);

export default MoodLogging;