import express  from 'express';
import { Home } from '../server/auth';

const router = express.Router();

router.get('/',Home);


export default router;
