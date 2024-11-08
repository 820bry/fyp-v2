import { useState } from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CircularProgress from '@mui/material/CircularProgress';

import appLogo from '../../assets/icon.png';

const logoStyle = {
    width: '80px',
    height: 'auto',
    cursor: 'pointer'
}

const Header = ({ isLoading, isAuthed }) => {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
               top: targetScroll,
               behavior: 'smooth', 
            });
            setOpen(false);
        }
    };

    return (
        <div>
            <AppBar
                position='fixed'
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2
                }}
            >
                <Container maxWidth='lg'>
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '990px',
                            bgcolor: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <img src={appLogo} style={logoStyle} alt="logo" />

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem
                                    onClick={() => scrollToSection('highlights')}
                                    sx={{ borderRadius: '99px', py: '6px', px: '12px'}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Highlights
                                    </Typography>
                                </MenuItem>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem
                                    onClick={() => scrollToSection('features')}
                                    sx={{ borderRadius: '99px', py: '6px', px: '12px'}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        Features
                                    </Typography>
                                </MenuItem>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MenuItem
                                    onClick={() => scrollToSection('faq')}
                                    sx={{ borderRadius: '99px', py: '6px', px: '12px'}}
                                >
                                    <Typography variant="body2" color="text.primary">
                                        FAQ
                                    </Typography>
                                </MenuItem>
                            </Box>
                            
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            {
                                isLoading ?
                                <CircularProgress />
                                :
                                isAuthed ?
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    component="a"
                                    href="/home"
                                >
                                    Open App
                                </Button>
                                :
                                <>
                                <Button
                                    color="secondary"
                                    variant="text"
                                    size="small"
                                    component="a"
                                    href="/register"
                                >
                                    Sign Up
                                </Button>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    size="small"
                                    component="a"
                                    href="/login"
                                >
                                    Login
                                </Button>
                                </>
                            }
                            
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="primary"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >

                                    {/* Navbar Items here (for nav drawer on mobile) */}

                                    <MenuItem onClick={() => scrollToSection('highlights')}>
                                        Highlights
                                    </MenuItem>

                                    <MenuItem onClick={() => scrollToSection('features')}>
                                        Features
                                    </MenuItem>

                                    <MenuItem onClick={() => scrollToSection('faq')}>
                                        FAQ
                                    </MenuItem>

                                    <Divider />

                                    {
                                        isLoading ?
                                        <CircularProgress />
                                        :
                                        isAuthed ?
                                        <MenuItem>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                component="a"
                                                href="/home"
                                                sx={{ width: '100%' }}
                                            >
                                                Open App
                                            </Button>
                                        </MenuItem>
                                        :
                                        <>
                                        <MenuItem>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                component="a"
                                                href="/login"
                                                sx={{ width: '100%' }}
                                            >
                                                Login
                                            </Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <Button
                                                color="secondary"
                                                variant="outlined"
                                                component="a"
                                                href="/register"
                                                sx={{ width: '100% '}}
                                            >
                                                Sign Up
                                            </Button>
                                        </MenuItem>
                                        </>
                                    }

                                    
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )

}

export default Header;