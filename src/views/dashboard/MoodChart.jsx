import React from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Chart from 'react-apexcharts';

import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';

const MoodChart = ({ data }) => {
    const theme = useTheme();

    const chartData = {
        height: 350,
        type: 'line',
        series: [{
            name: 'Mood',
            data: data.map(item => item.scale)
        }],
        options: {
            chart: {
                id: 'line-chart',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight',
                colors: [theme.palette.secondary.main],
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: data.map(item => item.date),
                labels: {
                    rotate: -90
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                min: 0
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        switch(val) {
                            case 1:
                                return 'Very Unpleasant';
                            case 2:
                                return 'Unpleasant';
                            case 3:
                                return 'Neutral';
                            case 4:
                                return 'Pleasant';
                            case 5:
                                return 'Very Pleasant';
                            default:
                                return '';
                        }
                    }
                }
            }
        }
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h3">Your mood trend</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        // check whether user has any data logged
                        data.length === 0 ? 
                        <Typography>No mood logging entries found yet. Start logging to see analysis!</Typography> 
                        : 
                        <Chart {...chartData} />
                    }
                </Grid>
            </Grid>
        </MainCard>
    );
}

MoodChart.propTypes = {
    data: PropTypes.array
};

export default MoodChart;