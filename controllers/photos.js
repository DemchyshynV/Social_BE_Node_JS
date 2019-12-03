const errorHandler = require('../utils/errorHandler');
const Photos = require('../models/Photo');
const User = require('../models/User');
module.exports.set = async (req, res) => {
    try {
        if (req.file) {
            const s = 'resources/' + req.file.path.substring(7);
            console.log(s);
            await Photos.create({
                url: s,
                user_id: req.user.id
            })
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    } catch (e) {
        errorHandler(res, e)
    }
};
module.exports.get = async (req, res) => {
    try {
        await Photos.findAll({
            where:{
                user_id:req.user.id
            }
        }).then(value => res.json(value))

    } catch (e) {
        errorHandler(res, e);
    }
}
