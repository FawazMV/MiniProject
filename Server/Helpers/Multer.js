import multer from "multer";
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 1000 * 1024 * 1024
    }
});

export default upload
