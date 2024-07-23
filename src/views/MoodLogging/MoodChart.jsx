import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import Chart from 'react-apexcharts';
import { parse, format, startOfWeek, startOfMonth, getWeek, getYear } from 'date-fns';

import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';

const MoodChart = ({ data }) => {
    const theme = useTheme();
    const [view, setView] = useState('daily');

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
          setView(newView);
        }
    };

    const processedData = useMemo(() => {
        if(!data || data.length === 0) return [];

        const sortedData = [...data].sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('/');
            const [dayB, monthB, yearB] = b.date.split('/');
            
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);
            
            return dateA - dateB; 
        });

        const parsedData = sortedData.map(item => ({
            ...item,
            parsedDate: parse(item.date, 'dd/MM/yyyy', new Date())
        }));

        switch(view) {
            case 'daily':
                return parsedData.map(item => ({
                    date: format(item.parsedDate, 'dd MMM yyyy'),
                    scale: item.scale
                }));
            case 'weekly':
                const weeklyData = {};
                parsedData.forEach(item => {
                    const week = `${getYear(item.parsedDate)}-W${getWeek(item.parsedDate)}`;
                    if(!weeklyData[week]) {
                        weeklyData[week] = { sum: 0, count: 0 };
                    }
                    weeklyData[week].sum += item.scale;
                    weeklyData[week].count += 1;
                });
                return Object.entries(weeklyData).map(([week, { sum, count }]) => ({
                    date: week,
                    scale: sum / count
                }));
            case 'monthly':
                const monthlyData = {};
                parsedData.forEach(item => {
                    const month = format(item.parsedDate, 'MMM yyyy');

                    if(!monthlyData[month]) {
                        monthlyData[month] = { sum: 0, count: 0 };
                    }
                    monthlyData[month].sum += item.scale;
                    monthlyData[month].count += 1;
                });
                return Object.entries(monthlyData).map(([month, { sum, count }]) => ({
                    date: month,
                    scale: sum / count
                }));
        }
    }, [data, view]);

    const chartData = {
        height: 350,
        type: 'line',
        series: [{
            name: 'Mood',
            data: processedData.map(item => item.scale)
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
                categories: processedData.map(item => item.date),
                labels: {
                    rotate: -90,
                    rotateAlways: true
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
                            <Typography variant="h3" sx={{ py: '7.7px' }}>Your mood trend</Typography>
                        </Grid>
                        {
                            data.length !== 0 &&
                            <Grid item>
                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    aria-label="view toggle"
                                >
                                    <ToggleButton value="daily" size="small" aria-label="daily view" disableRipple>
                                        Daily
                                    </ToggleButton>
                                    <ToggleButton value="weekly" size="small" aria-label="weekly view" disableRipple> 
                                        Weekly
                                    </ToggleButton>
                                    <ToggleButton value="monthly" size="small" aria-label="monthly view" disableRipple>
                                        Monthly
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        }
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