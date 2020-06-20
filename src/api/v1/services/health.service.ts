import IHealthService from './interfaces/IHealthService';

class HealthService implements IHealthService {
	constructor() {}
	async heartbeat(): Promise<any> {
		const result = { status: 200, data: 'Server is running.' };
		return result;
	}
	async check(data: any): Promise<any> {
		return data;
	}
}

export default HealthService;
