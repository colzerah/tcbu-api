import { diskStorage } from 'multer';
import { resolve } from 'path';

export default {
  upload(folder: string) {
    return {
      storage: diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileName = file.originalname;
          return callback(null, fileName);
        },
      }),
    };
  },
};
