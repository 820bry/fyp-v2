import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';

const blink = keyframes`
    0% { opacity: .2; }
    20% { opacity: 1; }
    100% { opacity: .2; }
`;

const LoadingAnim = () => {
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        {[0, 1, 2].map((index) => (
            <Box
                key={index}
                sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'grey.500',
                    borderRadius: '50%',
                    mx: 0.5,
                    animation: `${blink} 1.4s infinite both`,
                    animationDelay: `${index * 0.2}s`,
                }}
            />
        ))}
    </Box>
};

export default LoadingAnim;