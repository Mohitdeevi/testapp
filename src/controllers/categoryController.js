import Category from '../models/categoryModel.js';
import { createCategorySchema, updateCategorySchema } from '../validation/categoryValidation.js';
import { handleError } from '../utils/errors.js';

export const createCategory = async (req, res) => {
  try {
    const validatedData = createCategorySchema.parse(req.body);
    const category = new Category(validatedData);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const validatedData = updateCategorySchema.parse(req.body);
    const category = await Category.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};
