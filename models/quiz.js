const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    grade:{
        type: Number,
        required: true,
    },
    subject:{
        type: String,
        required: true
    },
    totalQuestions:{
        type: Number,
        require: true
    },
    maxScore:{
        type: Number,
        require: true
    },
    difficulty:{
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    questions: [
        { 
            questionId: {
                type: String,
                required: true
            },
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    type: String,
                    required: true
                }
            ],
            correctAnswer: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true
            }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const quiz = mongoose.model('quiz', quizSchema)
module.exports = quiz;