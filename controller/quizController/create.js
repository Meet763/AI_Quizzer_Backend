const Quiz = require('../../models/quiz');
const getGroqChatCompletion = require('../../AI_quiz_controller/aiquiz')

const createQuiz = async (req, res) => {
    try {
        // Extract data from the request body
        const { grade, subject, totalQuestions, maxScore, difficulty } = req.body;
    
        // Validate input data
        if (!grade || !subject || !totalQuestions || !maxScore || !difficulty) {
          return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Get the quiz content from Groq API
        const chatCompletion = await getGroqChatCompletion(grade, subject, totalQuestions, maxScore, difficulty);
    
        // Log and send the response
        const responseContent = chatCompletion.choices[0]?.message?.content || "";
        console.log('Chat Completion Response:', responseContent);

        // Regex to extract quiz data
        const quizRegex = /{\s*"quiz":\s*(\[[\s\S]*?\])\s*}/;
        const quizMatch = responseContent.match(quizRegex);
        if (!quizMatch) {
            return res.status(500).json({ message: 'Quiz format is invalid' });
        }

        const quizData = JSON.parse(quizMatch[1]);
        const formattedQuiz = quizData.map(item => ({
            questionId: item.questionId,
            question: item.question,
            options: item.options,
            correctAnswer: item.correctAnswer,
            score: item.score
        }));

        // Create a new quiz document
        const newQuiz = new Quiz({
          grade,
          subject,
          totalQuestions,
          maxScore,
          difficulty,
          questions: formattedQuiz,
        });

        // Save the quiz document to the database
        await newQuiz.save();

        // Retrieve the saved quiz document
        const savedQuiz = await Quiz.findById(newQuiz.id);

        // Respond with the desired format
        const response = savedQuiz.questions.map(item => ({ 
            questionId: item.questionId,
            question: item.question,
            options: item.options
        }));
 

        return res.status(201).json({ message: 'Quiz created successfully', quizId: newQuiz.id, content: response });
      } catch (error) {
        console.error('Error creating quiz:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
};

module.exports = createQuiz;