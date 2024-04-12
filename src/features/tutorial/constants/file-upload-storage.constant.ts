import { diskStorage } from 'multer';
import path from 'path';

export const storage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'contents');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.parse(file.originalname).ext;
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
  }),
};
