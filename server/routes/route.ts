import express  from 'express';
import { Home , signup  ,signin, verifyotpSignup ,verifyotpSignin ,sendOTPsignin} from '../auth';

const router = express.Router();

router.get('/',Home);
router.post('/signup',signup);
router.post('/signin',signin);
// router.post('/sendotp-signup' ,sendOTPsignup)
router.post('/verifyotp-signup' , verifyotpSignup)
router.post('/signin-sendotp' ,sendOTPsignin)
router.post('/verifyotp-signin' , verifyotpSignin)


export default router;
