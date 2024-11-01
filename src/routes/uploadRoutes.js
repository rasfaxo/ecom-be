import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|webp|png/;
  const mimetypes = /image\/jpe?g|image\/webp|image\/png/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(ext) && mimetypes.test(mimetype)) {
    return cb(null, true);
  } else {
    return cb(new Error('tipe file tidak didukung'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5MB
});

const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(400)
        .json({ message: 'Ukuran file terlalu besar. Batas maksimum 5MB.' });
    }
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
};
router.post('/', upload.single('image'), uploadErrorHandler, (req, res) => {
  if (req.file) {
    return res.status(200).json({
      message: 'Gambar berhasil diunggah',
      image: `${req.file.path}`,
    });
  } else {
    return res.status(400).json({ message: 'Gambar tidak ditemukan' });
  }
});

export default router;
