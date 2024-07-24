import { useState, useEffect } from 'react';

import { onAuthStateChanged } from 'firebase/auth';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Features from './components/Features';
import FAQ from './components/FAQ';

import { auth } from '../firebase';

const Landing = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthed, setIsAuthed] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user) { // is logged in
                setIsAuthed(true);
            } else {
                setIsAuthed(false);
            }

            setIsLoading(false);
        })
    }, [])

    return (
        <>
        <Header isLoading={isLoading} isAuthed={isAuthed} />
        <Hero isLoading={isLoading} isAuthed={isAuthed} />
        <Box sx={{bgcolor: 'background.default'}}>
            <Highlights />
            <Features />
            <Divider />
            <FAQ />
        </Box>
        </>
    )
}

export default Landing;