import express from 'express';
import { createTask, updateTask, deleteTask, getAllTasks } from '../controllers/taskController.js';
import validate from '../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from '../validation/taskValidation.js';

const router = express.Router();

router.post('/', validate(createTaskSchema), createTask);
router.put('/:id', validate(updateTaskSchema), updateTask);
router.delete('/:id', deleteTask);
router.get('/', getAllTasks);

export default router;
