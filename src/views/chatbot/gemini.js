import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

let model = null;

export const initializeModel = async() => {

    model = genAI.getGenerativeModel({ model: "gemini-pro" });
};

export const generateResponse = async (input) => {
    if(!model) {
        throw new Error("GenAI model not initialized");
    }

    const prompt = `
    You are now a helpful mental health chatbot.
    Respond to the following in a supportive and informative manner, and provide any relevant resources and intervention techniques whenever necessary.
    Input: ${input}
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;

    console.log(response.text());

    return response.text();
}

