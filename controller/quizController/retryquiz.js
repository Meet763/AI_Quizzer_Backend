const Quiz = require('../../models/quiz');        

const retryQuiz = async (req, res) => {
    console.log(" retry quiz route called");
    try {
        const quizId = req.params.quizId;  // Get the quiz ID from the request params

        const quizData = await Quiz.findById(quizId);

        if (!quizData) {
            return res.status(404).json({ message: 'No previous attempt found for this quiz' });
        }

        // Fetch the quiz details from the previous attempt
        const quiz = quizData;

        // Return the quiz details to the user for retry
        return res.status(200).json({
            message: 'Quiz retrieved successfully for retry',
            quiz: {
                id: quiz.id,
                subject: quiz.subject,  // Include title if available
                questions: quiz.questions.map(q => ({
                    questionId: q.questionId,
                    question: q.question,
                    options: q.options,  // Assuming options are stored in the quiz
                }))
            }
        });

    } catch (error) {
        console.error('Error fetching quiz for retry:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = retryQuiz;
