const { body, query, check } = require('express-validator'); // express validator import
const user_Data = require('../models/user_DataSchema'); // user_DataSchema import

exports.user_register = ((req, res) => {
    return [
        body('email', 'Email is Required').isEmail()
        .custom((result, { req }) => {
            return user_Data.findOne({ email: result })
                .then(user => {
                    if (user) {
                        throw new Error('Email Already Exist');
                    } else {
                        return true;
                    }
                })
        }),
        body('username', 'User Name is Required').isAlphanumeric()
        .custom((result, { req }) => {
            return user_Data.findOne({ username: result })
                .then(user => {
                    if (user) {
                        throw new Error('User Name Already Exist');
                    } else {
                        return true;
                    }
                })
        }),
        body('phone', 'Phone No is Required').isNumeric()
        .custom((result, { req }) => {
            return user_Data.findOne({ phone: result })
                .then(user => {
                    if (user) {
                        throw new Error('Phone No Already Exist');
                    } else {
                        return true;
                    }
                })
        }),
        check('password', 'Password is Required').isAlphanumeric()
        .isLength({
            min: 8,
            max: 12
        }).withMessage(
            'Password must be greather then 8 characters and less then 12 characters'
        )
    ];
})

exports.user_login = (req, res) => {
    return [
        body('password', 'password is Required').isAlphanumeric()
        .custom((result, { req }) => {
            const userObj = req.body;
            return user_Data.findOne({ $or: [{ email: userObj.email }, { username: userObj.username }, { phone: userObj.phone }] })
                .then(user => {
                    if (user) {
                        req.userO = user; //to save user details in req
                    } else {
                        throw new Error('User Does Not Exist');
                    }
                })

        })
    ]
}