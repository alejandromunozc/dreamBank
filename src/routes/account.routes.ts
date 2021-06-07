import { Router } from 'express';
import passport from 'passport';
const router = Router();


router.get('/account', passport.authenticate('jwt', {session:false}), (req, res) => {
  res.send('Hola Account');
})

export default router;