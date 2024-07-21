import React from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { lineHeight, styled } from '@mui/system';

const GradientSlider = styled(Slider)(( { theme } ) => ({
    color: 'transparent',
    height: 15,
    '& .MuiSlider-rail': {
        opacity: 1,
        backgroundImage: 'linear-gradient(to right, #4caf50, #ffeb3b, #f44336)',
    },
    '& .MuiSlider-track': {
        display: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 32,
        width: 32,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 18,
        background: 'unset',
        padding: 0,
        width: 48,
        height: 48,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: theme.palette.primary.main,
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
}));

const Scale = ({ value, max = 21 }) => {
    return (
        <Box
            sx={{
                margin: 'auto'
            }}
        >
            <GradientSlider
                value={value}
                min={0}
                max={max}
                valueLabelDisplay="on"
                aria-label="Result scale"
                disabled
            />
        </Box>
    );
}

export default Scale;