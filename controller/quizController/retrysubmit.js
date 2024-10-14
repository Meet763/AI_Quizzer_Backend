const User = require('../../models/user');
const QuizHistory = require('../../models/quizHistory');
const Quiz = require('../../models/quiz');

const submitRetryQuiz = async (req, res) => {
    console.log("Submit retry quiz route called");
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

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the previous attempt to increment the retry count
        const previousAttempt = await QuizHistory.findOne({ quizid: quizId, userid: user.id });
        if (!previousAttempt) {
            return res.status(404).json({ message: 'No previous attempt found for this quiz' });
        }

        // Create a new quiz history entry for the retry
        const newQuizHistory = new QuizHistory({
            userid: user.id,
            quizid: quizId,
            grade: quiz.grade,
            subject: quiz.subject,
            retryCount: previousAttempt.retryCount + 1, // Increment the retry count
            status: 'retrying', // Set status as retry
            getmarks: score,
            totalMarks: quiz.totalQuestions,
            completedDate: new Date(),
        });

        // Save the new quiz history document to the database
        await newQuizHistory.save();

        return res.status(200).json({ message: 'Retry answers submitted successfully', totalScore: score, results: detailedResults });
    } catch (error) {
        console.error('Error submitting retry answers:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = submitRetryQuiz;
