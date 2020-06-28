const passport = require('passport');

const optionalJwt = function(req, res, next) {
  if (req.headers['authorization']) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }
  return next();
};

// @usage 
// router.get('/my/route', accessRouteWithOrWithoutToken, function (req, res, next) {
//   if (req.isAuthenticated()) {
//     res.send('My name is ' + req.user.name);
//   } else {
//     res.send('I\'m not authenticated :(');
//   }
// });

module.exports = optionalJwt;