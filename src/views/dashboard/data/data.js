import { countBy } from "lodash";

export function analyzeMoodData(userData) {

    // Sort data by date
    userData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate average mood
    const avgMood = userData.reduce((sum, entry) => sum + entry.scale, 0) / userData.length;

    // Determine mood trend
    const recentMood = userData.slice(-7).reduce((sum, entry) => sum + entry.scale, 0) / 7;
    const moodTrend = recentMood > avgMood ? 'improving' : 'declining';

    // Analyze impacts and feelings
    const impacts = userData.flatMap(entry => entry.impacts);
    const feelings = userData.flatMap(entry => entry.feelings);
    const topImpacts = Object.entries(countBy(impacts)).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topFeelings = Object.entries(countBy(feelings)).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Prepare data for charts
    const dailyMood = userData.map(entry => ({
        date: entry.date,
        scale: entry.scale
    }));

    const impactFrequency = topImpacts.map(([impact, frequency]) => ({ impact, frequency }));

    return {
        average_mood: avgMood,
        mood_trend: moodTrend,
        top_impacts: topImpacts,
        top_feelings: topFeelings,
        daily_mood: dailyMood,
        impact_frequency: impactFrequency
    };

}

