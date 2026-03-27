import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import taskRoutes from './routes/taskRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));

// Body parsers
app.use(json());
app.use(urlencoded({ extended: true }));

// Rate limiting
app.use(rateLimiter);

// Routes
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/categories', categoryRoutes);

// Error handling
app.use(errorHandler);

export default app;
