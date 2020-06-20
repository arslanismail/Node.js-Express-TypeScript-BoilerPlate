import { Application } from 'express';
import * as bodyParser from 'body-parser';

const config = (app: Application) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
};

export default { config };
