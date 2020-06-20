import IHealthController from './interfaces/IHealthController';

import { Request, Response, NextFunction } from 'express';

import HealthService from '../services/health.service';
import IHealthService from '../services/interfaces/IHealthService';

const healthService: IHealthService = new HealthService();

class HealthController implements IHealthController {
	constructor() {}
	async heartbeat(req: Request, res: Response, next: NextFunction) {
		const result = await healthService.heartbeat();
		return res.json(result).end();
	}
	async check(req: Request, res: Response, next: NextFunction) {
		const data = await healthService.check(req.body);
		return res.json(data).end();
	}
}

export default new HealthController();
