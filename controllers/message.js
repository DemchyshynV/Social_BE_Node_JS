const Profile = require('../models/Profile');
const Messages = require('../models/Messages');
const Op = require('sequelize').Op;


module.exports.getSenders = async function (req, res) {
    try {
        const myId = req.user.id;
        const senders = await Messages.findAll({
            attribute: ['from_id'],
            where: {
                [Op.or]: {
                    to_id: myId,
                    from_id: myId
                }
            },
            order: [['id', 'DESC']],
        }).then(value => value.map(value => {
            if (value.from_id === myId){
            return value.to_id
            }
            return value.from_id
        }));
        await Profile.findAll({
            attributes: ['id', 'name', 'surname', 'avatar'],
            where: {
                id: {[Op.in]: senders}
            },
        }).then(value => res.json(value))
    } catch (e) {
        console.log(e)
    }
};


module.exports.getBody = async function (req, res) {
    try {
        const id = req.params.id;
        const me = req.user.id;
        const result = await Messages.findAll({
            attributes: ['body', 'from_id', 'to_id'],
            where: {
                [Op.or]: {
                    from_id: id,
                    to_id: id
                }
            }
        }).then(value => value.map(value => value.from_id === me ? Object.assign(value.get(), {me: true}) : value));
        res.json(result)
    } catch (e) {
        console.log(e)
    }
};


module.exports.addMessage = async function (req, res) {
    try {
        await Messages.create({
            from_id: req.user.id,
            to_id: req.body.id,
            body: req.body.body
        }).then(res.json({msg: 'success'}))
    } catch (e) {
        console.log(e)
    }
};
