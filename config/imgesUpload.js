var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/avatar');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})
var upload = multer({ storage: storage }).single('avatar');
module.exports = upload;