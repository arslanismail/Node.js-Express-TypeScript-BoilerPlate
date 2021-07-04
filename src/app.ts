import * as express from 'express';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import 'dotenv/config';
if (!fs.existsSync('.env')) {
	// Do something
	console.log(
		'.env File is not Present Make sure you are in Production Environment and have added All Required Envioronmental Variables'
	);
}

// API Routes
import ApiRoutes from './api/index';

import ApiDoc from './docs/api.docs';

const app = express();
'';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
const PORT = process.env.PORT || 3010;
const ENV = process.env.NODE_ENV || 'development';
app.set('port', PORT);
app.set('env', ENV);

// const whitleListDomain = [
// 	`http://localhost:${PORT}`
// 	// 'http://alloweddomain.com'
// ];

ApiDoc();

//#region View Path registration
app.use(express.static(path.join(__dirname, './../public')));

app.get('/docs', (req: Request, res: Response, _next: NextFunction) => {
	res.sendFile(path.join(__dirname, './../public/index.html'));
});

//#endregion

app.use('/api', ApiRoutes);

export default app;
