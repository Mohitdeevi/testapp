import express from 'express';
import { createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import validate from '../middleware/validate.js';
import { createCategorySchema, updateCategorySchema } from '../validation/categoryValidation.js';

const router = express.Router();

router.post('/', validate(createCategorySchema), createCategory);
router.put('/:id', validate(updateCategorySchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;
