//routes are made to access data from database and to get and post requests
const router = require('express').Router();
let Exercise= require('../model/exercise.model');//conects routes to models

router.route('/').get((req,res)=>{
    Exercise.find()//method from mongoose get all the Exercises from  database,results are returned in json format
        .then(exercise=>res.json(exercise))
        .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const username= req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    newExercise.save()
        .then(()=>res.json('Exercise added!'))
        .catch(err=>res.status(400).json('Error:'+err));
});
//also update,delte and modify commands so that it can become a working model
router.route('/:id').get((req,res)=>{//object id created by mongodb
    Exercise.findById(req.params.id)//get object id from database in form get,post
        .then(exercise=>res.json(exercise))
        .catch(err=>res.status(400).json('Error'+err))
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Exercise deleted.'))
        .catch(err=>res.status(400).json('Error'+err))
});

router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercise=>{
            exercise.username = req.params.username;
            exercise.description = req.params.description;
            exercise.durationn = req.params.duration;
            exercise.date = req.params.date;
        })
})
module.exports = router;