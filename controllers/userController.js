const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {body} = require('express-validator')
const userModel = require('../models/userModel')

exports.createUser = (req, res) => {

    //console.log('in')
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        console.log("errors in validation: ", errors.array())
        res.status(422);
        res.send({ errors: errors.array()})
        return;
    }

    let user = req.body.user;
    //console.log(user)
    userModel.createUser(user)
        .then(result => {
            //console.log(result)
            user.userId = result.insertId
            const {password, ...userNoPass} = user
            res.send(userNoPass)
        })
        .catch(err => {
            console.log('Error creating user', err)
            res.send({ errorCode: err.code, errorMessage: err.sqlMessage })
        })
}

exports.signInUser = (req, res) => {

    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
        console.log("errors in validation: ", errors.array())
        res.status(422);
        res.send({ errors: errors.array()})
        return;
    }

    let email = req.body.email
    let password = req.body.password

    userModel.getUserFromCredentials(email, password)
        .then(result => {
            //console.log(result)
            if (result.length > 0) {
                let user = result[0].user
                //console.log('---->', user)

                const token = jwt.sign({ 
                    sub: user,
                    iss: 'Zaila'
                }, process.env.SECRET_PHRASE, {expiresIn: process.env.TOKEN_EXPIRATION});
                //console.log(token)

                res.status(200).send({token, user})

            } else
                throw new Error("Invalid User")
        })
        .catch(err=> {
            console.log(err)
            res.status(403)
            res.send({ errorCode: 403, errorMessage: "Sign In not allowed. "+ err })
        })
}

exports.getUser = (req, res) => {
    
    //console.log('===>',req.params.userId)

    let userId = req.params.userId;

    userModel.getUserById(userId)
        .then(result => {
            if(result.length > 0)
                res.send(result[0].user)
            else    
                res.send({ message: 'No data found', userId })
        })
        .catch(err => {
            console.log(err)
            res.send({ errorCode: 500, errorMessage: err.message })
        })
}

exports.validateUser = [
        body('user', 'user object is mandatory').exists(),
        body('user.name', 'name is mandatory').not().isEmpty(),
        body('user.preferredLanguage', 'preferred Language is mandatory').not().isEmpty(),
        body('user.email', 'email is mandatory').isEmail().bail(),
        body('user.email').custom((value, { req }) => {
            
                userModel.getUserFromEmail(value)
                .then(result => {
                    //console.log('email', result)
                    if (result.length > 0) {
                        console.log("email already exists")
                        throw new Error('email is already registered');
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                return true;
        }),

        body('user.password').custom((value, { req }) => {
            //console.log('---->', req.body.user)
            if (req.body.user.iss != 'Google') {
                if (!value) {
                    console.log("password is mandatory")
                    throw new Error("password is mandatory");
                }
            }
            return true;
        }),
        body('user.autoPlayDescription').customSanitizer(value => value ? value : '1'),
        body('user.autoEnrollQuest').customSanitizer(value => value ? value : '1'),

    ]

    exports.validateLogin = [
        
        body('email', 'email is mandatory').exists().bail().isEmail(),
        body('password').custom((value, { req }) => {
            if (req.body.iss != 'Google') {
                if (!value) {
                    console.log("password is mandatory")
                    throw new Error("password is mandatory");
                }
            }
            return true;
        }),
    ]
