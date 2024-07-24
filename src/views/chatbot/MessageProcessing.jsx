import nlp from 'compromise';
import compromiseSentences from 'compromise-sentences';

import { resources, interventionTechniques, responses } from './responses';

nlp.extend(compromiseSentences);

const topics = {
    anxiety: ['anxious', 'nervous', 'worry', 'panic', 'stress'],
    depression: ['sad', 'depressed', 'hopeless', 'unmotivated', 'exhausted'],
    anger: ['angry', 'furious', 'irritated', 'frustrated', 'mad'],
    sleep: ['insomnia', 'tired', 'fatigue', 'exhausted', 'sleepy'],
    relationships: ['lonely', 'breakup', 'divorce', 'friend', 'family'],
};
  
const intents = {
    seek_help: ['help', 'support', 'advice', 'guidance'],
    share_experience: ['feel', 'feeling', 'felt', 'experiencing', 'going through'],
    ask_information: ['what is', 'how to', 'why do', 'can you explain'],
};

function analyseSentiment(input) {
    const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'like', 'enjoy'];
    const negativeWords = ['sad', 'bad', 'awful', 'terrible', 'horrible', 'hate', 'dislike', 'angry', 'upset'];

    const words = input.toLowerCase().split(/\W+/);
    let score = 0;

    words.forEach(word => {
        if (positiveWords.includes(word)) score++;
        if (negativeWords.includes(word)) score--;
    });

    return score / words.length; // normalise score
}

function analyseText(input) {
    const doc = nlp(input);

    // Sentiment analysis
    const sentiment = analyseSentiment(input);

    // Topic detection
    const detectedTopics = Object.entries(topics).filter(([topic, keywords]) =>
        keywords.some(keyword => doc.has(keyword))
    ).map(([topic]) => topic);

    // Intent detection
    const detectedIntents = Object.entries(intents).filter(([intent, keywords]) => 
        keywords.some(keyword => doc.has(keyword))
    ).map(([intent]) => intent);

    // Entity extraction
    const people = doc.people().out('array');
    const places = doc.places().out('array');
    const organisations = doc.organizations().out('array');

    return {
        sentiment: sentiment,
        topics: detectedTopics,
        intents: detectedIntents,
        entites: { people, places, organisations },
        text: doc.text()
    };
}

export default function generateResponse(input) {

    const analysis = analyseText(input);
    let responseOptions = [];
    let selectedResources = [];
    let selectedTechnique = '';


    if(input.toLowerCase().match(/^(hi|hello|hey)/)) {      // user greeting
        responseOptions = responses.greeting;
    }
    // responses based on sentiment
    else if(analysis.sentiment > 0.1) {
        responseOptions = responses.positive;
    }
    else if(analysis.sentiment < -0.1) {
        responseOptions = responses[analysis.topics[0]] || responses.neutral;
    }
    else {
        responseOptions = responses.neutral;
    }

    // topic-specific questions
    if(analysis.topics.length > 0) {
        responseOptions = responseOptions.concat(responses[analysis.topics[0]]);
    }

    // intent-specific questions
    if(analysis.intents.includes('seek_help')) {
        responseOptions = responseOptions.concat(responses.seek_help);
    }

    // if not enough context, ask for further clarification
    if(responseOptions.length < 1) {
        responseOptions = responses.clarification;
    }

    // select resources and/or intervention techniques based on detected topics
    if(analysis.topics.length > 0) {
        const primaryTopic = analysis.topics[0];
        selectedResources = resources[primaryTopic] || resources.general;
        selectedTechnique = interventionTechniques[primaryTopic] ?
            interventionTechniques[primaryTopic][Math.floor(Math.random() * interventionTechniques[primaryTopic].length)] :
            '';
    }

    // Randomly select a response
    const response = responseOptions[Math.floor(Math.random() * responseOptions.length)];

    // Combine response with resources and techniques
    let fullResponse = response;
    if (selectedTechnique) {
        fullResponse += `\n\nHere's a technique you might find helpful: ${selectedTechnique}`;
    }
    if (selectedResources.length > 0) {
        fullResponse += `\n\nHere are some resources that might be useful:\n${selectedResources.map(resource => `- ${resource.name}: ${resource.link}`).join('\n')}`;
    }
    return {
        text: fullResponse,
        sentiment: analysis.sentiment,
        topics: analysis.topics,
        intents: analysis.intents,
        resources: selectedResources,
        technique: selectedTechnique
    };
}