
import { Application, Request, Response, NextFunction } from 'express';
export default {
	config: (app: Application) => {
		// Set user in response to use in next middlewares.
		app.use((req: Request, res: Response, next: NextFunction) => {
			// TODO: Verify user from Database and Set in the res.locals object to make it available in the next middlewares.
			// res.locals.user = req.user;
			next();
		});
	}
}
