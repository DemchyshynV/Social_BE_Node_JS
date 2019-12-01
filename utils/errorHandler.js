module.exports = function (res, err)  {
    res.status(500).json({
        success: false,
        message: error.message ? error.message : err
    })
};
