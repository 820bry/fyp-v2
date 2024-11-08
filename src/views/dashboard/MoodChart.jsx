import { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import Chart from 'react-apexcharts';
import { parse, format, subDays, } from 'date-fns';

import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';

const MoodChart = ({ data }) => {
    const theme = useTheme();
    const [view, setView] = useState('7days');

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

        const today = new Date();
        const filterDate = view === '7days' ? subDays(today, 6) : subDays(today, 29);

        // Set the filterDate to the start of the day
        filterDate.setHours(0, 0, 0, 0);

        const filteredData = parsedData.filter(item => {
            // Set the item's date to the start of its day for comparison
            const itemDate = new Date(item.parsedDate);
            itemDate.setHours(0, 0, 0, 0);
            return itemDate >= filterDate;
        });

        const allDates = [];
        for(let d = filterDate; d <= today; d.setDate(d.getDate() + 1)) {
            allDates.push(new Date(d));
        }

        return allDates.map(date => {
            const matchingItem = filteredData.find(item => 
                item.parsedDate.getDate() === date.getDate() &&
                item.parsedDate.getMonth() === date.getMonth() &&
                item.parsedDate.getFullYear() === date.getFullYear()
            );
            return {
                date: format(date, 'dd MMM'),
                scale: matchingItem ? matchingItem.scale : 0
            };
        });
        
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
                width: '100%',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
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
                    rotateAlways: true,
                    rotate: -90,
                },
                tickAmount: 6
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
                                return 'No data';
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
                            <Typography variant="h3" sx={{ py: '7.7px' }}>Your mood trends</Typography>
                        </Grid>
                        {
                            processedData.length !== 0 &&
                            <Grid item>
                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={handleViewChange}
                                    aria-label="view toggle"
                                >
                                    <ToggleButton value="7days" size="small" aria-label="7 days" disableRipple>
                                        Last 7 days
                                    </ToggleButton>
                                    <ToggleButton value="30days" size="small" aria-label="3 days" disableRipple> 
                                        Last 30 days
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {
                        // check whether user has any data logged
                        processedData.length === 0 ? 
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