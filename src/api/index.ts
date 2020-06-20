import { Router, NextFunction, Response, Request } from 'express';

import ApiV1Routes from './v1';

const router = Router();

router.use('/v1', ApiV1Routes);

router.use((req: Request, res: Response, next: NextFunction) => {
});
export default router;
