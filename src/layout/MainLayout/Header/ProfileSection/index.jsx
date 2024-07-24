import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, collection, getDoc, updateDoc } from "firebase/firestore";

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton'

// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import Transitions from '../../../../ui-component/extended/Transitions';
import User1 from '../../../../assets/images/users/user-round.svg';
import { auth, firestore } from '../../../../firebase';
import { gridSpacing } from '../../../../store/constant';
import { generateKey } from '../../../../utils/keygenerator';

// assets
import CloseIcon from '@mui/icons-material/Close';
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);

    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [uid, setUid] = useState('');
    const [iconKey, setIconKey] = useState('');

    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        setUid(user.uid);
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFirstName(docSnap.data().firstName);
            setLastName(docSnap.data().lastName);

            // check if user has icon key
            if(docSnap.data().iconKey) {
              setIconKey(docSnap.data().iconKey);
            } else {
              const usersRef = collection(firestore, "users");
                updateDoc(doc(usersRef, user.uid), {
                  iconKey: generateKey(16)
              });
            }
          }
        } catch(e) {
          console.error("error retrieving user info: " + e);
        }
      });
    }), [];

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
      signOut(auth).then(() => {
        // Sign-out successful, auto redirect done by SessionProvider.
      }).catch((error) => {
        console.error(error.code + " : " + error.message);
      });
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    const handleListItemClick = (event, index) => {
      handleClose(event);

      switch(index) {
        case 0:
          handleModalOpen();
          break;
        case 1:
          handleLogout();
          break;
      }
    };
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    const handleRandomizeIcon = () => {
      try {
        const usersRef = collection(firestore, "users");
        const newKey = generateKey(16);
        updateDoc(doc(usersRef, uid), {
            iconKey: newKey
        });
        setIconKey(newKey);
      } catch(e) {
        console.log(e);
      }
    }


    // settings page
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '75%',
      bgcolor: 'background.paper',
      p: 4,
    };

    return (
      <>
        {/* Settings Popup */}
        <Modal
          open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid item xs={12}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'right'
              }}
              >
                <IconButton onClick={handleModalClose} sx={{ color: 'black' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconButton>
                      <Avatar
                        src={"https://api.multiavatar.com/" + iconKey + ".svg"}
                        sx={{
                          width: '200px',
                          height: '200px'
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pt: 2
                    }}
                  >
                    <Button variant="text" color="secondary" onClick={handleRandomizeIcon}>Click me to randomize your icon!</Button>
                  </Box>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  xd
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>


        <Chip
          sx={{
            height: '48px',
            alignItems: 'center',
            borderRadius: '27px',
            transition: 'all .2s ease-in-out',
            borderColor: theme.palette.primary.light,
            backgroundColor: theme.palette.primary.light,
            '&[aria-controls="menu-list-grow"], &:hover': {
              borderColor: theme.palette.primary.main,
              background: `${theme.palette.primary.main}!important`,
              color: theme.palette.primary.light,
              '& svg': {
                stroke: theme.palette.primary.light
              }
            },
            '& .MuiChip-label': {
              lineHeight: 0
            }
          }}
          icon={
            <Avatar
              src={"https://api.multiavatar.com/" + iconKey + ".svg"}
              sx={{
                ...theme.typography.mediumAvatar,
                margin: '8px 0 8px 8px !important',
                cursor: 'pointer'
              }}
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              color="inherit"
            />
          }
          label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
          variant="outlined"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color="primary"
        />
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 14]
                }
              }
            ]
          }}
        >
          {({ TransitionProps }) => (
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                    <Box sx={{ p: 3, pb: 0 }}>
                      <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="h4">Logged in as</Typography>
                          <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                            {firstName} {lastName}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          onClick={(event) => handleListItemClick(event, 0)}
                        >
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          onClick={(event) => handleListItemClick(event, 1)}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </Popper>
      </>
    );
};

export default ProfileSection;
