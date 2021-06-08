import { Router } from 'express';
import { averageTransaction, createTransaction, getTransactionDetail, getTransactions } from '../controllers/transaction.controller';
import { jwtAuth } from '../middlewares/passport'

const router = Router();

router.get('/transaction/:id', jwtAuth, getTransactions);
router.get('/transaction/detail/:id', jwtAuth, getTransactionDetail);
router.post('/transaction/average/', jwtAuth, averageTransaction);
router.post('/transaction/', jwtAuth, createTransaction);

export default router;