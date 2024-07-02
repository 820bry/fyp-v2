// material-ui
import { styled } from '@mui/material/styles';

// project imports

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  minHeight: '100vh'
}));

const AuthWrapper1 = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://picsum.photos/1920/1080)',
  backgroundRepeat: 'no-repeat',
  // backgroundColor: (t) =>
  //     theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh'
}));

export default AuthWrapper1;
