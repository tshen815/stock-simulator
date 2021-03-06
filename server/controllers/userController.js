const User = require('../models/userModel.js');

// middleware for user sign up, data, and login POST requests - added april 19th  
const userController = {
    
    // redirected from POST '/user/signup' end point
    // check with Tristen for password bcrypt
    createNewUser(req, res, next) {
        User.create(
            { username: req.body.username, password: req.body.password, cash: 50000, stockList: [] },
            (err, user) => {
                if (err) return next(err)
                res.locals.user = user;
                console.log('this is res.locals.user>>>', res.locals.user)
                next();
            });
    },

     // redirected from POST '/user/login' end point
    userLogin(req, res, next) {
        // have to check with Tristen for authentication 
    },

     // redirected from POST '/user/getdata' end point
    getUserData(req, res, next) {
        User.findOne({_id: req.body._id}, (err, user) => {
            if (err) return next(err)
            if (!user) return next('User not found')
            res.locals.user = {
                username: user.username,
                _id: user._id,
                stockList: user.stockList,
                cash: user.cash,
            };
            console.log('this is res.locals.user>>>', res.locals.user)
            next();
        });
    }
}

module.exports = userController;