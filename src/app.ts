import express, { Request, Response } from 'express';
import router from './app/routers';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();


app.use(express.json());
app.use('/api',router)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Meeting Room Booking...');
});

// Not Found middleware (should be after all routes)
app.use(notFound);

// Global error handler (should be last middleware)
app.use(globalErrorHandler);

export default app;