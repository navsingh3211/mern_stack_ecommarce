import multer from 'multer';
import {v4 as uuid} from 'uuid';

// multer().single("file"); 

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null,"uploads");
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    const filename = `${id}.${extName}`;
    callback(null,filename);
  }
});

export const singleUpload = multer({storage}).single("photo");//req.file.photo--> access the file