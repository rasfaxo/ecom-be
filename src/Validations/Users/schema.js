import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username harus berupa teks.',
    'string.min': 'Username harus memiliki setidaknya 3 karakter.',
    'string.max': 'Username tidak boleh lebih dari 30 karakter.',
    'any.required': 'Username wajib diisi.',
    'string.empty': 'Username tidak boleh kosong.',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } })
    .required()
    .messages({
      'string.base': 'Email harus berupa teks.',
      'string.empty': 'Email tidak boleh kosong.',
      'string.email': 'Email harus valid.',
      'any.required': 'Email wajib diisi.',
    }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required()
    .messages({
      'string.min': 'Password harus memiliki setidaknya 6 karakter.',
      'string.pattern.base': 'Password harus berisi huruf atau angka.',
      'any.required': 'Password wajib diisi.',
      'string.empty': 'Password tidak boleh kosong.',
    }),
});

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } })
    .required()
    .messages({
      'string.base': 'Email harus berupa teks.',
      'string.email': 'Email harus valid.',
      'any.required': 'Email wajib diisi.',
      'string.empty': 'Email tidak boleh kosong.',
    }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password harus memiliki setidaknya 6 karakter.',
    'any.required': 'Password wajib diisi.',
    'string.empty': 'Password tidak boleh kosong.',
  }),
});

const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username harus berupa teks.',
    'string.min': 'Username harus memiliki setidaknya 3 karakter.',
    'string.max': 'Username tidak boleh lebih dari 30 karakter.',
    'any.required': 'Username wajib diisi.',
    'string.empty': 'Username tidak boleh kosong.',
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'id'] } })
    .required()
    .messages({
      'string.email': 'Email harus valid.',
      'any.required': 'Email wajib diisi.',
      'string.empty': 'Email tidak boleh kosong.',
    }),
});

const updatePasswordSchema = Joi.object({});

const sanitizeFields = (fields) => {
  return Object.keys(fields).reduce((acc, key) => {
    acc[key] =
      typeof fields[key] === 'string' ? sanitizeHtml(fields[key]) : fields[key];
    return acc;
  }, {});
};

const validateUser = (fields, schema) => {
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

export {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
  updatePasswordSchema,
  validateUser,
};
