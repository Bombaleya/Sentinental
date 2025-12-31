import 'dotenv/config'
import express from 'express';
import { routes } from './route/authRouter';
import cors from 'cors'


const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
// app.get('/', (req, res) => res.json({status: 'ok', server: 'authorization'}));
app.use('/auth', routes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


 