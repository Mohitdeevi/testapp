import Task from '../models/taskModel.js';
import { createTaskSchema, updateTaskSchema } from '../validation/taskValidation.js';
import { handleError } from '../utils/errors.js';

export const createTask = async (req, res) => {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    const task = new Task(validatedData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const validatedData = updateTaskSchema.parse(req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    handleError(res, error);
  }
};
