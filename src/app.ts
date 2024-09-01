import express, { Request, Response } from 'express';
import router from './app/routers';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import path from 'path';

const app = express();

// Middleware for parsing JSON and enabling CORS
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: ['http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
  
  }));

  app.use(express.static(path.join(__dirname, 'public')));
// Application route
app.use('/api',router)


// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Meeting Room Booking...');
});

// Not Found middleware (should be after all routes)
app.use(notFound);

// Global error handler (should be last middleware)
app.use(globalErrorHandler);

export default app;