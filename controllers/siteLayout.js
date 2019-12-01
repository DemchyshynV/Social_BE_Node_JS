const Profile = require('../models/Profile');
const uploadFile = require('../middleware/file');
const fs = require('fs');
module.exports.getProfile = async function (req, res) {
    // const result = await Profile.findByPk(req.user.id);

    req.user.getProfile().then(
        value => res.json(value)
    )

};
module.exports.avatar = async function (req, res) {
    try {
        if (req.file) {
            const s = 'resources/'+req.file.path.substring(7);
            console.log(s);
            await req.user.getProfile().then(value => value.update({avatar:s}));
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }
    } catch (e) {
        console.log(e)
    }
};

