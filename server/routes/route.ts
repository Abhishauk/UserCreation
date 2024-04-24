import express  from 'express';
import { Home , signup , signin} from '../auth';

const router = express.Router();

router.get('/',Home);
router.post('/signup',signup);
router.post('/signin',signin)


export default router;
