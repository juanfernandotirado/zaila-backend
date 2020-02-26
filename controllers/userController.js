const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel')

exports.createUser = (req, res) => {

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
    let email = req.body.email
    let password = req.body.password

    userModel.getUserFromCredentials(email, password)
        .then(result => {
            //console.log(result)
            if (result.length > 0) {
                let user = result[0].user
                //console.log('---->', user)

                const token = jwt.sign({ 
                    sub: user
                }, process.env.SECRET_PHRASE, {expiresIn: process.env.TOKEN_EXPIRATION});
                //console.log(token)

                res.status(200).send({token, user})

            } else
                throw new Error("Invalid User")
        })
        .catch(err=> {
            console.log(err)
            res.status(403)
            res.send({ errorCode: 403, errorMessage: "Sign In not allowed" })
        })
}

exports.getUser = (req, res) => {
    
    console.log('===>',req.params.userId)

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