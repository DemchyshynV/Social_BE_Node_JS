const express = require('express');
const passport = require('passport');
const router = express.Router();
const siteLayoutController = require('../controllers/siteLayout');

router.get('/getProfile', passport.authenticate('jwt', {session: false}), siteLayoutController.getProfile);
router.post('/profile/avatar', passport.authenticate('jwt', {session: false}), siteLayoutController.avatar);


module.exports = router;
