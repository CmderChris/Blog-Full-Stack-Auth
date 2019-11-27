import { Router } from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import usersRouter from './authors';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';

const router = Router();

router.use((req, res, next) => {
    passport.authenticate('bearer', { session: false }, (err, user, info) => {
        if(user) req.user = user;
        return next();
    })(req, res, next);
});

router.use('/blogs', blogsRouter);
router.use('/authors', usersRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);

export default router;