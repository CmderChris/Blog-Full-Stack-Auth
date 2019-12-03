import { Router } from 'express';
import DB from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        let user = req.body;
        user.password = HashPassword(req.body.password);
        let result: any = await DB.authors.insert(user);
        let token = await CreateToken({ authorid: result.insertId });
        res.json({
            token,
            role: 'guest',
            authorid: result.insertId
        })
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

export default router;