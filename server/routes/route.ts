import express  from 'express';
import { 
    Home,
    signup,
    signin, 
    verifyotpSignup,
    verifyotpSignin,
    sendOTPsignin,
    sendOTPforgot,
    verifyotpforgot,
    setpassword} from '../auth';

const router = express.Router();

router.get('/',Home);
router.post('/signup',signup);
router.post('/signin',signin);
router.post('/verifyotp-signup' , verifyotpSignup)
router.post('/signin-sendotp' ,sendOTPsignin)
router.post('/verifyotp-signin' , verifyotpSignin)
router.post('/forgot-sendotp' ,sendOTPforgot)
router.post('/verifyotp-forgot' , verifyotpforgot)
router.post('/setpassword',setpassword)


export default router;
