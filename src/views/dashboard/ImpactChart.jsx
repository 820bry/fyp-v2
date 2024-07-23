import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Chart from 'react-apexcharts';
import { parse, subDays, isAfter, isSameDay, startOfDay } from 'date-fns';

import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';

const ImpactChart = ({ data }) => {
    const theme = useTheme();

    const chartData = {
        height: 350,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                width: '100%',
                stacked: true,
                toolbar: {
                    show: false
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: '100%'
                        }
                    }
                }]
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: false
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: data.map(item => item.impact),
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
            fill: {
                type: 'solid',
                colors: [theme.palette.secondary.main],
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " time(s)";
                    }
                }
            }
        },
        series: [{
            name: 'Frequency',
            data: data.map(item => item.frequency)
        }],
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h3" sx={{ py: '7.7px' }}>What's having the biggest impact on you</Typography>
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
};

ImpactChart.propTypes = {
    data: PropTypes.array
}

export default ImpactChart;