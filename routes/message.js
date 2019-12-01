const express = require('express');
const passport = require('passport');
const router = express.Router();
const messageController = require('../controllers/message');

router.get('/getSenders', passport.authenticate('jwt', {session: false}), messageController.getSenders);
router.get('/getBody/:id', passport.authenticate('jwt', {session: false}), messageController.getBody);
router.post('/addMessage', passport.authenticate('jwt', {session: false}), messageController.addMessage);


module.exports = router;
