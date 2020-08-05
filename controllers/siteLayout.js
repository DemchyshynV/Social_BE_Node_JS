module.exports.getProfile = async function (req, res) {
    try {
        req.user.getProfile().then(
            value => {
                return res.json(value)
            }
        )
    } catch (e) {
        console.log(e)
    }
};


module.exports.avatar = async function (req, res) {
    try {
        if (req.file) {
            const s = 'resources/' + req.file.path.substring(7);
            console.log(s);
            await req.user.getProfile().then(value => value.update({avatar: s}));
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

