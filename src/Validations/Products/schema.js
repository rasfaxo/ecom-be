import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Nama produk harus berupa teks.',
    'string.min': 'Nama produk harus memiliki setidaknya 3 karakter.',
    'string.max': 'Nama produk tidak boleh lebih dari 100 karakter.',
    'any.required': 'Nama produk wajib diisi.',
  }),
  description: Joi.string().min(10).required().messages({
    'string.base': 'Deskripsi produk harus berupa teks.',
    'string.min': 'Deskripsi produk harus memiliki setidaknya 10 karakter.',
    'any.required': 'Deskripsi produk wajib diisi.',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Harga harus berupa angka.',
    'number.min': 'Harga tidak boleh kurang dari 0.',
    'any.required': 'Harga wajib diisi.',
  }),
  brand: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Merek harus berupa teks.',
    'string.min': 'Merek harus memiliki setidaknya 2 karakter.',
    'string.max': 'Merek tidak boleh lebih dari 100 karakter.',
    'any.required': 'Merek wajib diisi.',
  }),
  quantity: Joi.number().min(1).required().messages({
    'number.base': 'Jumlah harus berupa angka.',
    'number.min': 'Jumlah harus setidaknya 1.',
    'any.required': 'Jumlah wajib diisi.',
  }),
  category: Joi.string().required().messages({
    'string.base': 'Kategori harus berupa teks.',
    'any.required': 'Kategori wajib diisi.',
  }),
  image: Joi.string().required().messages({
    'string.base': 'Gambar harus berupa teks.',
    'any.required': 'Gambar wajib diisi.',
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    'string.base': 'Nama produk harus berupa teks.',
    'string.min': 'Nama produk harus memiliki setidaknya 3 karakter.',
    'string.max': 'Nama produk tidak boleh lebih dari 100 karakter.',
  }),
  description: Joi.string().min(10).messages({
    'string.base': 'Deskripsi produk harus berupa teks.',
    'string.min': 'Deskripsi produk harus memiliki setidaknya 10 karakter.',
  }),
  price: Joi.number().min(0).messages({
    'number.base': 'Harga harus berupa angka.',
    'number.min': 'Harga tidak boleh kurang dari 0.',
  }),
  brand: Joi.string().min(2).max(100).messages({
    'string.base': 'Merek harus berupa teks.',
    'string.min': 'Merek harus memiliki setidaknya 2 karakter.',
    'string.max': 'Merek tidak boleh lebih dari 100 karakter.',
  }),
  quantity: Joi.number().min(1).messages({
    'number.base': 'Jumlah harus berupa angka.',
    'number.min': 'Jumlah harus setidaknya 1.',
  }),
  category: Joi.string().messages({
    'string.base': 'Kategori harus berupa teks.',
  }),
  image: Joi.string().required().messages({
    'string.base': 'Gambar harus berupa teks.',
    'any.required': 'Gambar wajib diisi.',
  }),
});

const sanitizeFields = (fields) => {
  return Object.keys(fields).reduce((acc, key) => {
    acc[key] =
      typeof fields[key] === 'string' ? sanitizeHtml(fields[key]) : fields[key];
    return acc;
  }, {});
};

const validateProduct = (fields, schema) => {
  const sanitizedData = sanitizeFields(fields);
  const { error } = schema.validate(sanitizedData, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => ({
      message: detail.message,
      path: detail.path.join('.'),
      type: detail.type,
    }));
  }
  return null;
};

export { createProductSchema, updateProductSchema, validateProduct };
