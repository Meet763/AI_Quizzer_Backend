const User = require('../../models/user');
const QuizHistory = require('../../models/quizHistory')
const Quiz = require('../../models/quiz');


const submitQuiz = async (req, res) => {
    try {
        const { quizId, responses } = req.body;
  
        // Validate input data
        if (!quizId || !responses) {
            return res.status(400).json({ message: 'Quiz ID and responses are required' });
        }
  
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
  
        // Initialize score and detailed result array
        let score = 0;
        const detailedResults = [];

        // Evaluate responses
        responses.forEach(response => {
            const question = quiz.questions.find(q => q.questionId === response.questionId);
            if (question) {
                const isCorrect = question.correctAnswer === response.userResponse;

                if (isCorrect) {
                    score += question.score;
                }

            detailedResults.push({
                questionId: question.questionId,
                question: question.question,
                correctAnswer: question.correctAnswer,
                userAnswer: response.userResponse,
                isCorrect: isCorrect,
                score: question.score,
            });
        }
    });

        const user = await User.findById(req.user.id); // Adjust fields as needed
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

         // Create a new quiz history entry
        const newQuizHistory = new QuizHistory({
            userid: user.id, // Assuming req.user contains the authenticated user's info
            quizid: quizId,
            grade: quiz.grade,
            subject: quiz.subject,
            retryCount:0,
            status: 'completed',
            getmarks: score,
            totalMarks: quiz.totalQuestions, // Assuming totalMarks is equal to total questions
            completedDate: new Date(),
        });

        // Save the quiz history document to the database
        await newQuizHistory.save();
        
  
        return res.status(200).json({ message: 'Answers submitted successfully', totalScore: score, results: detailedResults });
    } catch (error) {
          console.error('Error submitting answers:', error);
          return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = submitQuiz;