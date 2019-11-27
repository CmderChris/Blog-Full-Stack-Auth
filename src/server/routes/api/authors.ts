import * as express from 'express';
import DB from '../../db';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const authors = await DB.authors.findAll();
        res.json(authors);
    } catch (error) {
        console.log(error);
        res.status(500).json('My code sucks.');
    }
});

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let author = await DB.authors.findOneById(id);
        res.send(author);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:email', async (req, res, next) => {
    let email = req.params.email;
    try {
        let author = await DB.authors.findOneByEmail(email);
        res.send(author);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;