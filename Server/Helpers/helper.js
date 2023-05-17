import fs from 'fs'
export const imageRemove = (image) => {
    fs.unlink('uploads/' + image, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File deleted successfully');
        }
    });
}