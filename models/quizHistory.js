const mongoose = require('mongoose');

const quizHistorySchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz',
        required: true
    },
    grade: {
        type: String, // or Number, depending on how you want to store grade levels
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    getmarks: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    retryCount: {
        type: Number,
        default: 0  
    },
    status: {
        type: String,
        enum: ['completed', 'retrying'],
        default: 'completed'
    },
    completedDate: {
        type: Date,
        required: true
    }   
}, {
    timestamps: true
});

// Create a model from the schema
const QuizHistory = mongoose.model('QuizHistory', quizHistorySchema);

module.exports = QuizHistory;
