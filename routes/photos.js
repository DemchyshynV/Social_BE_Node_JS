const express = require('express');
const passport = require('passport');
const router = express.Router();
const photosController = require('../controllers/photos');

router.post('/set', passport.authenticate('jwt', {session:false}), photosController.set)
router.get('/get', passport.authenticate('jwt', {session:false}), photosController.get)

module.exports = router;
