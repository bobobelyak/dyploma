const User = require('../models/user');

exports.checkRole = roles => (req, res, next) => {
  const user = req.user;

  User.findById(user._id, (err, user) => {

    if(err){
      res.status(422).json({error: 'No user found.'});
      return next(err);
    }

    if(roles.indexOf(user.role) > -1){
      return next();
    }

    res.status(401).json({error: 'You are not authorized to view this content'});
    return next('Unauthorized');

  });
};