
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from '../../../store/constant';

// ==============================|| SKELETON TOTAL GROWTH BAR CHART ||============================== //

const LoadingChartCard = () => (
  <Card>
    <CardContent>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={340} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default LoadingChartCard;
