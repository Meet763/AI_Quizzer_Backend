const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware} = require('./../auth');
const Quizhistory = require('../models/quizHistory');
const submitQuiz = require('../controller/quizController/submit');
const createQuiz = require('../controller/quizController/create');
const retryQuiz = require('../controller/quizController/retryquiz');
const submitRetryQuiz = require('../controller/quizController/retrysubmit');

router.post('/create', jwtAuthMiddleware, createQuiz);

router.post('/submit', jwtAuthMiddleware, submitQuiz);

router.get('/retry/:quizId', jwtAuthMiddleware, retryQuiz);

router.post('/retry/submit', jwtAuthMiddleware, submitRetryQuiz);

router.get('/quizhistory', jwtAuthMiddleware, async (req, res) => {
    try{
        const data = await Quizhistory.find();
        console.log('data fetched');
        res.status(200).json(data)
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/quizhistory/grade/:grade', jwtAuthMiddleware, async (req, res) => {
    try{
        const grade = req.params.grade;
        const data = await Quizhistory.find({ grade });
        if (data.length == 0){
            return res.status(404).json({ error: 'No quiz history found for this grade' }) ;
        }
        console.log('data fetched');
        res.status(200).json(data)
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/quizhistory/subject/:subject', jwtAuthMiddleware, async (req, res) => {
    try{
        const subject = req.params.subject;
        const data = await Quizhistory.find({ subject });
        if (data.length == 0){
            return res.status(404).json({ error: 'No quiz history found for this subject' }) ;
        }
        console.log('data fetched');
        res.status(200).json(data)
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})
  
router.get('/quizhistory/marks/:marks', jwtAuthMiddleware, async (req, res) => {
    try{
        const getmarks = req.params.marks;
        const data = await Quizhistory.find({ getmarks });

        if (data.length == 0){
            return res.status(404).json({ error: 'No quiz history found for this mark' });
        }

        console.log('data fetched');
        res.status(200).json(data)
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

router.get('/quizhistory/daterange/:startdate/:enddate', jwtAuthMiddleware, async (req, res) => {
    try{
        const startDate = new Date(`${req.params.startdate}T00:00:00Z`);// Ensuring the time component
        const endDate = new Date(`${req.params.enddate}T23:59:59Z`); 
        endDate.setDate(endDate.getDate() + 1);

        const data = await Quizhistory.find({
            completedDate: {
                $gte: startDate,  // Greater than or equal to the start of the day
                $lt: endDate  // Less than the start of the next day
            }
        });

        if (data.length == 0){
            return res.status(404).json({ error: 'No quiz history found for this date' }) ;
        }
        console.log('data fetched');
        res.status(200).json(data)
    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

module.exports = router;