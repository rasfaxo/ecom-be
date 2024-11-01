import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Nama harus berupa teks',
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama harus memiliki setidaknya 3 karakter',
    'string.max': 'Nama tidak boleh lebih dari 30 karakter',
    'any.required': 'Nama kategori wajib diisi',
  }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Nama harus berupa teks',
    'string.empty': 'Nama tidak boleh kosong',
    'string.min': 'Nama harus memiliki setidaknya 3 karakter',
    'string.max': 'Nama tidak boleh lebih dari 30 karakter',
    'any.required': 'Nama kategori wajib diisi',
  }),
});

const sanitizedFields = (fields) => {
  return Object.keys(fields).reduce((acc, key) => {
    acc[key] =
      typeof fields[key] === 'string' ? sanitizeHtml(fields[key]) : fields[key];
    return acc;
  }, {});
};

const validateCategory = (fields, schema) => {
  const sanitizedData = sanitizedFields(fields);
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

export {
  createCategorySchema,
  updateCategorySchema,
  validateCategory,
  sanitizedFields,
};
