const Groq = require('groq-sdk');

// Initialize the Groq instance with your API key
const groq = new Groq({ apiKey: process.env.AI_api });

// Function to get chat completion from Groq
async function getGroqChatCompletion(grade, subject, totalQuestions, maxScore, difficulty) {
  const prompt =`Generate a quiz in JSON format with a maximum of ${totalQuestions} questions, ` +
                `a max score of ${maxScore}, an ${difficulty} difficulty level, ` +
                `appropriate for ${grade}th grade, and focused on the subject of ${subject}. ` +
                `The JSON should have the following structure:

                {
                  "quiz": [
                    {
                      "questionId": "1",
                      "question": "Your question here",
                      "correctAnswer": "Correct answer here",
                      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                      "score": 1
                    },
                    {
                      "questionId": "2",
                      "question": "Your question here",
                      "correctAnswer": "Correct answer here",
                      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                      "score": 1
                    }
                  ]
                }
                
                Make sure each question includes four answer options attach and provide the correct answer and score.`; 
                 

  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt
        },
      ],
      model: "llama3-8b-8192",
    });

    return response; // Return the full response object or modify as needed
  } catch (error) {
    console.error('Error', error);
    throw Error('failed to generae quiz'); // Re-throw error to handle upstream
  }
}

module.exports = getGroqChatCompletion;
