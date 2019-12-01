const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const keys = require('../configs/keys');

module.exports.login = async function (req, res) {
    try {


        const candidate = JSON.parse(new Buffer.from(req.body, 'base64').toString());
        const user = await User.findOne({
            where: {
                email: candidate.email
            }
        });
        if (user !== null) {
            const resultPassword = bcrypt.compareSync(candidate.password, user.password);
            if (resultPassword) {
                const token = jwt.sign(
                    {id: user.id, email: candidate.email},
                    keys.jwt.secret,
                    {expiresIn: keys.jwt.expiresIn, algorithm: keys.jwt.algorithm},
                );
                res.status(200).json({
                    Authorization: `Bearer ${token}`
                });
            }
        }
        res.status(418).json({success: false});
    } catch (e) {

        }

};

module.exports.register = async function (req, res) {
    try {
        const isAdmin = await User.count();
        let candidate = await User.findOne({where: {email: req.body.email}});
        if (candidate) {
            res.status(409).json({
                msg: 'Error: User has been exist!!!'
            })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const password = req.body.password;
            let user = await User.create({
                email: req.body.email,
                password: bcrypt.hashSync(password, salt),


                profile: {
                    sex: req.body.profile.sex,
                    age: req.body.profile.age,
                    name: req.body.profile.name,
                    surname: req.body.profile.surname,
                    admin: isAdmin ? false : true
                },


            }, {
                include: [Profile]
            });

            res.status(201).json({
                msg: 'User has been created'
            });
        }
    } catch (e) {

    }
};




