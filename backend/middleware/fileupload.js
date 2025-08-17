const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/cars'); // folder to store car images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // unique filename
    }
});

// File filter (optional - only images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
