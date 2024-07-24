import { useNavigate } from 'react-router-dom';

import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import AppImage from '../../assets/app.png';

const Hero = ({ isLoading, isAuthed }) => {
    const navigate = useNavigate();

    return (
        <Box id="hero"
            sx={() => ({
                width: '100%',
                backgroundImage:'linear-gradient(180deg, #C9F4E4, #FFF)',
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat'
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        Mental Healthcare, Anywhere
                    </Typography>

                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        MentalQuest is designed to deliver simple-to-use and easy-to-access mental healthcare features to an even broader audience.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                    >
                        {
                            isLoading ?
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <CircularProgress alignSelf="center"/>
                            </Box>
                            :
                            isAuthed ?
                            <Button variant="contained" color="secondary" component="a" href="/home">
                                Open MentalQuest
                            </Button>
                            :
                            <>
                            <Button variant="contained" color="secondary" component="a" href="/login">
                                Login to MentalQuest
                            </Button>
                            <Button variant="text" color="secondary" component="a" href="/login">
                                Sign up for a new account
                            </Button>
                            </>
                        }
                    </Stack>
                </Stack>
                <Box
                    id="image"
                    sx={(theme) => ({
                        mt: { xs: 8, sm: 10},
                        alignSelf: 'center',
                        height: { xs: 200, sm: 700 },
                        width: '100%',
                        backgroundImage: `url(${AppImage})`,
                        backgroundSize: 'cover',
                        borderRadius: '10px',
                        outline: '1px solid',
                        outlineColor: alpha('#BFCCD9', 0.5),
                        boxShadow: `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`,
                    })}
                />
            </Container>
        </Box>
    )
}

export default Hero;