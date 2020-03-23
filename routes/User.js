const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require("../passport");
const JWT = require('jsonwebtoken');
const User = require("../models/Users");
const Todo = require("../models/Todo");

const signToken = userID => {
    return JWT.sign({
        iss: "NoobCoder",
        sub: userID
    }, "NoobCoder", {expiresIn: "1h"});
}

// LogOut Route
userRouter.post('/register', (req, res) => {
    const {username, password, role} = req.body;
    User.findOne({username}, (err, user) => {
        if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        if (user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
        else {
            const newUser = new User({username, password, role});
            newUser.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "Username is already taken", msgError: true}});
                else
                    res.status(201).json({message: {msgBody: "Account Successfully created", msgError: false}});
            })
        }
    })
});

// Login Route
userRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) =>{
    if (req.isAuthenticated()) {
        const {_id,username,role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username,role}})
    }
});

// LogOut Route
userRouter.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) =>{
    res.clearCookie('access_token');
    res.json({user:{username: "", role: ""}, success: true});
});

// Create a todo
userRouter.post('/todo', passport.authenticate('jwt', {session: false}), (req, res) =>{
   const todo = new Todo(req.body);
   todo.save(err => {
       if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else {
            req.user.todos.push(todo);
            req.user.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else
                    res.status(200).json({message: {msg: "Successfully Created Todo", msgError: false}})
            })
        }
   })
});

// Get All Todo
userRouter.get('/todos', passport.authenticate('jwt', {session: false}), (req, res) =>{
    User.findById({_id: req.user._id}).populate('todos').exec((err, document) => {
        if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else
            res.status(200).json({todos: document.todos, authenticated: true});
    })    
});

// For User Admin Route
userRouter.get('/admin', passport.authenticate('jwt', {session: false}), (req, res) =>{
    if (req.user.role == "admin") {
        res.status(200).json({message: {msgBody: "You are an admin", msgError: false}});
    }
    else {
        res.status(403).json({message: {msgBody: "You are not an admin, go away", msgError: true}});
    }
});

// Still be loggedin if he was authenticated
userRouter.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const {username, role} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username, role}});
});


module.exports = userRouter;