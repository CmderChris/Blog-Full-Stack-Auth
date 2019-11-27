import { Router, Request } from 'express';
import * as passport from 'passport';
import { CreateToken } from '../../utils/security/tokens';

const router = Router(); 

router.post('/', passport.authenticate('local'), async (req: Req, res, next) => {
    try {
        let token = await CreateToken({ authorid: req.user.id });
        res.json({
            token,
            authorid: req.user.id,
            role: req.user.role
        })
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

interface Req extends Request {
    user: {
        id: number,
        role: string
    }
}

export default router;