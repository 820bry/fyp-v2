import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <>
        <Container
        id="faq"
        sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
        }}
        >
            <Typography
                component="h1"
                variant="h1"
                color="text.primary"
                sx={{
                width: { sm: '100%', md: '60%' },
                textAlign: { sm: 'left', md: 'center' },
                }}
            >
                Frequently Asked Questions
            </Typography>
            <Box sx={{ width: '100%' }}>
                <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                    sx={{
                        p: 2,
                        boxShadow: 1
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                    >
                        <Typography component="h2" variant="h3">
                            Can MentalQuest replace a professional therapist?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                    >
                        No. MentalQuest is not designed to replace a professionally-trained mental health therapist. 
                        The features provided are only capable of detecting basic symptoms of mental illnesses.
                        If proper diagnosis is required, please seek professional healthcare.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={handleChange('panel2')}
                    sx={{
                        p: 2,
                        boxShadow: 1
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                    >
                        <Typography component="h2" variant="h3">
                            What kind of data is obtained and stored by MentalQuest?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                    >
                        To protect the user's privacy and anonymity, MentalQuest only stores:<br />
                        1. The user's personal and login information<br />
                        2. The user's logging data<br />
                        No other information is retrieved from the user, with most features processing data on-the-spot and not stored anywhere.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'panel3'}
                    onChange={handleChange('panel3')}
                    sx={{
                        p: 2,
                        boxShadow: 1
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                    >
                        <Typography component="h2" variant="h3">
                            Where can I get additional resources regarding mental healthcare?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ maxWidth: { sm: '100%', md: '70%' } }}
                    >
                        Additional resources can be obtained <Link target="_blank" href="https://www.helpguide.org/find-help.htm">here</Link>.
                    </Typography>
                    </AccordionDetails>
                </Accordion>

            </Box>
        </Container>
        </>
    );
}

export default FAQ;