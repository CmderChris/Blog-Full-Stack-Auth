import * as express from 'express';
import { sendEmail } from '../../utils/mailgun'

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await sendEmail('christopherkeithsmith@gmail.com', req.body.email, req.body.subject, req.body.message);
        res.send('Email sent!');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

export default router;