import logger from '../../logger.js';
// gemini.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = process.env.GEMINI_API_URL;

export async function askGemini(prompt) {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'No response from Gemini.';
  } catch (error) {
    logger.error(error.stack);
    logger.error('Error calling Gemini API:', error.message);
    return 'Error contacting Gemini API.';
  }
}

// Enhanced AI functions for CodeStreak
export async function generateWeeklyPlan(goal, userPreferences) {
  try {
    const { PROMPTS } = await import('../../ai/prompts.js');
    const prompt = PROMPTS.generateWeeklyPlan(goal, userPreferences);
    const response = await askGemini(prompt);
    logger.info('AI response:', response);

    // Remove markdown code block wrappers if present
    const cleanedResponse = response
      .replace(/^```json\s*/i, '') // remove ```json at the start
      .replace(/^```\s*/i, '')     // or plain ```
      .replace(/\s*```$/, '')      // remove ``` at the end
      .trim();
    // logger.info('Cleaned AI response:', cleanedResponse);
    // Try to parse JSON response
    try {
      const plan = JSON.parse(cleanedResponse);
      // logger.info('Generated weekly plan:', plan);
      return plan;
    } catch (parseError) {
      logger.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    logger.error('Error generating weekly plan:', error);
    throw error;
  }
}

export async function generateDailyQuestion(userProfile, completedTopics, streak) {
  try {
    const { PROMPTS } = await import('../../ai/prompts.js');
    const prompt = PROMPTS.generateDailyQuestion(userProfile, completedTopics, streak);
    const response = await askGemini(prompt);

        // Remove markdown code block wrappers if present
    const cleanedResponse = response
      .replace(/^```json\s*/i, '') // remove ```json at the start
      .replace(/^```\s*/i, '')     // or plain ```
      .replace(/\s*```$/, '')      // remove ``` at the end
      .trim();

    
    try {
      const recommendation = JSON.parse(cleanedResponse);
      return recommendation;
    } catch (parseError) {
      logger.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    logger.error('Error generating daily question:', error);
    throw error;
  }
}

export async function generateProgressFeedback(weeklyProgress, streak) {
  try {
    const { PROMPTS } = await import('../../ai/prompts.js');
    const prompt = PROMPTS.generateProgressFeedback(weeklyProgress, streak);
    const response = await askGemini(prompt);
    
    try {
      const feedback = JSON.parse(response);
      return feedback;
    } catch (parseError) {
      logger.error('Failed to parse AI response as JSON:', parseError);
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    logger.error('Error generating progress feedback:', error);
    throw error;
  }
}

// Utility function to validate AI response
export function validateAIResponse(response, expectedFields) {
  if (!response || typeof response !== 'object') {
    return false;
  }
  
  for (const field of expectedFields) {
    if (!(field in response)) {
      return false;
    }
  }
  
  return true;
}
