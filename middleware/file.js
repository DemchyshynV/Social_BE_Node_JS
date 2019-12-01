const multer = require('multer');
const uuid = require('uuid/v1');


const diskStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images')
    },
    filename(req, file, cb) {
        cb(null, uuid() + file.originalname)
    }
});

const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

module.exports = multer({
    storage:diskStorage, fileFilter:fileFilter
})

