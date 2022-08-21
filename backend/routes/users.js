const router = require('express').Router();
let User= require('../model/users.model');

router.route('/').get((req,res)=>{
    User.find()//method from mongoose get all the users from  database,results are returned in json format
        .then(users=>res.json(users))
        .catch(err=>res.status(400).json('Error:'+err));
});

router.route('/add').post((req,res)=>{
    const username= req.body.username;
    const newUser = new User({username});
    newUser.save()
        .then(()=>res.json('User added!'))
        .catch(err=>res.status(400).json('Error:'+err));

});

module.exports = router;