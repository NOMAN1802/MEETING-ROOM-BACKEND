import express, { Request, Response } from 'express';
import router from './app/routers';
const app = express();


app.use(express.json());
app.use('/api',router)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Meeting Room Booking...');
})

export default app;