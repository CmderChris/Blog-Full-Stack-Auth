import { Router } from 'express';
import * as passport from 'passport';

import blogsRouter from './blogs';
import usersRouter from './authors';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';
import donateRouter from './donate';
import contactRouter from './contact';

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
router.use('/donate', donateRouter);
router.use('/contact', contactRouter);

export default router;