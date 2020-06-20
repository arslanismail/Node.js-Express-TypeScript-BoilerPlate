import IHealthService from '../../src/api/v1/services/interfaces/IHealthService';
import HealthService from '../../src/api/v1/services/health.service';

const healthService: IHealthService = new HealthService();

describe('Health Service Tests', () => {
	it('should return a success message.', async () => {
		const someData: object = {
			name: 'Name',
			number: 8.5,
		};

		// const response: object = await healthService.check(someData);

		// expect(response).toEqual(someData);
	});

	it('should return a pulse for heartbeat API', async () => {
		const result = { status: 200, data: 'Server is running.' };

		// const response: object = await healthService.heartbeat();

		// expect(response).toEqual(result);
	});
});
