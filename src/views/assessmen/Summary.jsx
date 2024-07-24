import { useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";

import Scale from './Scale';
import { gridSpacing } from '../../store/constant';
import { PHQ9, GAD7, Combined } from './ResultText';

const Summary = () => {

    const { state } = useLocation();

    const total = state.scores.reduce((acc, curr) => acc + (curr !== null ? curr : 0), 0);
    const phq9total = state.scores.slice(0, 9).reduce((acc, curr) => acc + curr, 0);
    const gad7total = state.scores.slice(9, 16).reduce((acc, curr) => acc + curr, 0);

    const getDescription = (score, descriptions) => {
        return descriptions.find(desc => score >= desc.range[0] && score <= desc.range[1]);
    }

    return (
        <>
        <Card sx={{ 
            mb: 3, 
            boxShadow: 6,
            bgcolor: 'grey.100',
            color: 'black',
            px:'10%',
            py: 3
        }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sx={{m: 2}}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Box sx={{color: 'inherit'}}>
                            <Typography variant="h1">Your Results</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ py: 8 }}>
                        <Scale value={total} max='48'/>
                    </Box>
                    <Box sx={{px: '5%', pb: 10}}>
                        <Typography variant="h2">{getDescription(total, Combined).title}</Typography>
                        <Typography
                            variant="body1"
                            fontSize="0.9rem"
                            sx={{
                                py: 1.5
                            }}
                        >
                             {getDescription(total, Combined).summary}
                        </Typography>

                    </Box>
                    <Divider sx={{opacity: 1, borderBottomWidth: 2}} />
                </Grid>
                <Grid item xs={12} sx={{m: 2}}>
                    <Box sx={{color: 'inherit'}}>
                        <Typography variant="h2">Results Breakdown:</Typography>
                    </Box>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{px: '10%'}}>
                        <Box sx={{color: 'inherit'}}>
                                <Typography variant="h3">Depression Risk</Typography>
                        </Box>
                        <Box sx={{ py: 8 }}>
                            <Scale value={phq9total} max='27'/>
                        </Box>
                        <Box sx={{px: '3%', pb: 10}}>
                            <Typography variant="h3">{getDescription(phq9total, PHQ9).title}</Typography>
                            <Typography
                                variant="body1"
                                fontSize="0.9rem"
                                sx={{
                                    py: 1.5
                                }}
                            >
                                {getDescription(phq9total, PHQ9).summary}
                            </Typography>

                        </Box>
                    </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{px: '10%'}}>
                        <Box sx={{color: 'inherit'}}>
                                <Typography variant="h3">Anxiety Risk</Typography>
                        </Box>
                        <Box sx={{ py: 8 }}>
                            <Scale value={gad7total} max='21'/>
                        </Box>
                        <Box sx={{px: '3%', pb: 10}}>
                            <Typography variant="h3">{getDescription(gad7total, GAD7).title}</Typography>
                            <Typography
                                variant="body1"
                                fontSize="0.9rem"
                                sx={{
                                    py: 1.5
                                }}
                            >
                                {getDescription(gad7total, GAD7).summary}
                            </Typography>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
            
        </Card>
        </>
    );
}

export default Summary;