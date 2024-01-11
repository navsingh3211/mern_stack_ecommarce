import multer from 'multer';

// multer().single("file"); 

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null,"uploads");
  },
  filename(req, file, callback) {
    callback(null,file.originalname);
  }
});

export const singleUpload = multer({storage}).single("photo");//req.file.photo--> access the file