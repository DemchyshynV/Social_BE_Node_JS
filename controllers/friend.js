const Friends = require('../models/Friends');
const Sequelize = require('sequelize');
const Profile = require('../models/Profile');
const Op = Sequelize.Op;


module.exports.getAll = async (req, res) => {
    try {
        const myFriends = await Friends.findAll({
            where: {user_id: req.user.id}
        }).then(value => value.map(value => value.friendId));
        myFriends.push(req.user.id);
        await Profile.findAll({
            attributes: ['id', 'avatar', 'name', 'surname'],
            where: {
                id: {[Op.not]: myFriends}
            }
        }).then(value => {
            console.log(value);
            return res.json(value)
        })

    } catch (e) {
        console.log(e)
    }
};


module.exports.save = async (req, res) => {
    try {

        await Friends.create({user_id: req.user.id, friendId: req.params.id}).then(res.json({msg: 'success'}))
    } catch (e) {
        console.log(e)
    }
};


module.exports.myFriends = async (req, res) => {
    try {
        const friendsIds = await Friends.findAll({
            where: {user_id: req.user.id}
        }).then(value => value.map(value => value.friendId))
        const result = await Friends.findAll({
            attributes: ['user_id'],
            where: {
                user_id: {[Op.in]: friendsIds},
                friendId: req.user.id
            }
        }).then(value => value.map(value => value.user_id));
        await Profile.findAll({
            attributes: ['id', 'name', 'surname', 'avatar'],
            where: {
                id: {[Op.in]: result}
            }
        }).then(value => res.json(value))
    } catch (e) {
        console.log(e)
    }
};


module.exports.del = async (req, res) => {
    try {
        const myId = req.user.id;
        const fid = req.params.id;
        await Friends.destroy({
            where: {
                friendId: fid,
                user_id: myId
            }
        });
        await Friends.destroy({
            where: {
                friendId: myId,
                user_id: fid
            }
        });
        res.json({success: true});
    } catch (e) {
        console.log(e)
    }
};


module.exports.myRequests = async (req, res) => {
    try {
        const allFriends = await Friends.findAll({
            where: {user_id: req.user.id}
        }).then(value => value.map(value => value.friendId));
        const myFriends = await Friends.findAll({
            attributes: ['user_id'],
            where: {
                user_id: {[Op.in]: allFriends},
                friendId: req.user.id
            }
        }).then(value => value.map(value => value.user_id));
        let result = [];
        allFriends.forEach(value => {
            if (!myFriends.includes(value))
                result.push(value)
        });
        await Profile.findAll({
            attribute: ['id', 'name', 'surname', 'avatar'],
            where: {
                id: {[Op.in]: result},
            }
        }).then(value => res.json(value))
    } catch (e) {
        console.log(e)
    }
};


module.exports.friendsRequest = async (req, res) => {
    try {
        console.log(req.user.id);
        const allFriends = await Friends.findAll({
            where: {user_id: req.user.id}
        }).then(value => value.map(value => value.friendId));
        const myFriends = await Friends.findAll({
            attributes: ['user_id'],
            where: {
                user_id: {[Op.in]: allFriends},
                friendId: req.user.id
            }
        }).then(value => value.map(value => value.user_id));
        const iFriend = await Friends.findAll({
            where: {
                friendId: req.user.id
            }
        }).then(value => value.map(value => value.user_id));
        let result = [];
        iFriend.forEach(value => {
            if (!myFriends.includes(value))
                result.push(value)
        });
        await Profile.findAll({
            attribute: ['id', 'name', 'surname', 'avatar'],
            where: {
                id: {[Op.in]: result},
            }
        }).then(value => res.json(value))
    } catch (e) {
        console.log(e)
    }
};

