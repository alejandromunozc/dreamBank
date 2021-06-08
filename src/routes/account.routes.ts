import { Router } from 'express';
import { jwtAuth } from '../middlewares/passport'
import { createAccount, getAccounts } from '../controllers/account.controller';
const router = Router();

router.get('/account/:id', jwtAuth, getAccounts);
router.post('/account/', jwtAuth, createAccount);

export default router;