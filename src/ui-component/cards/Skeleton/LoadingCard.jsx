// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const LoadingCard = () => (
  <Card>
    <CardContent>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Skeleton variant="rectangular" width={44} height={34} />
            </Grid>
            <Grid item>
              <Skeleton variant="rectangular" width={34} height={34} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" sx={{ my: 1.6 }} height={40} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default LoadingCard;
