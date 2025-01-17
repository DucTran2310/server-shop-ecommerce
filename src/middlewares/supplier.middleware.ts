import { checkSchema } from 'express-validator';

// Tách phần schema chung
const supplierBaseSchema = {
  name: {
    isString: {
      errorMessage: 'Tên nhà cung cấp phải là một chuỗi.',
    },
    notEmpty: {
      errorMessage: 'Tên nhà cung cấp là bắt buộc.',
    },
    trim: true,
  },
  product: {
    isString: {
      errorMessage: 'Sản phẩm phải là một chuỗi.',
    },
    optional: true,
  },
  categories: {
    isArray: {
      errorMessage: 'Danh mục phải là một mảng.',
    },
    optional: true,
    custom: {
      options: (value: any) => {
        if (value && !Array.isArray(value)) {
          throw new Error('Danh mục phải là một mảng chuỗi.');
        }
        return true;
      },
    },
  },
  price: {
    isFloat: {
      errorMessage: 'Giá phải là một số hợp lệ.',
    },
    optional: true,
  },
  contact: {
    isString: {
      errorMessage: 'Liên hệ phải là một chuỗi.',
    },
    optional: true,
  },
  isTaking: {
    isInt: {
      errorMessage: 'isTaking phải là một số nguyên.',
    },
    isIn: {
      options: [[0, 1]],
      errorMessage: 'isTaking phải là 0 hoặc 1.',
    },
    optional: true,
  },
  photoUrl: {
    isString: {
      errorMessage: 'URL ảnh phải là một chuỗi.',
    },
    optional: true,
  },
};

export const addNewSupplierValidate = checkSchema({
  ...supplierBaseSchema
}, ['body']);

export const updateSupplierValidate = checkSchema({
  id: {
    in: ['query'],
    notEmpty: {
      errorMessage: 'ID nhà cung cấp là bắt buộc.',
    },
    isString: {
      errorMessage: 'ID nhà cung cấp phải là một chuỗi.',
    },
  },
  ...supplierBaseSchema
}, ['body', 'query']);

export const deleteSupplierValidate = checkSchema({
  id: {
    in: ['query'],
    notEmpty: {
      errorMessage: 'ID nhà cung cấp là bắt buộc.',
    },
    isString: {
      errorMessage: 'ID nhà cung cấp phải là một chuỗi.',
    },
  },
}, ['query']);
