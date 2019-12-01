const express = require('express');
const passport = require('passport');
const router = express.Router();
const friendController = require('../controllers/friend');

router.get('/getAll', passport.authenticate('jwt', {session: false}), friendController.getAll);
router.get('/save/:id', passport.authenticate('jwt', {session: false}), friendController.save);
router.get('/myFriends', passport.authenticate('jwt', {session: false}), friendController.myFriends);
router.delete('/del/:id', passport.authenticate('jwt', {session: false}), friendController.del);
router.get('/myRequests', passport.authenticate('jwt', {session: false}), friendController.myRequests);
router.get('/friendsRequest', passport.authenticate('jwt', {session: false}), friendController.friendsRequest);


module.exports = router;
