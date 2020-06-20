import { Application, Router, Request, Response, NextFunction } from 'express';
import { HealthController } from '../controllers';

const router = Router();

router.get('/', HealthController.heartbeat);
router.post('/check', HealthController.check);

export default router;
