import { Router } from 'express';
import DB from '../../db';

const router = Router();

router.get('/', async (req, res) => {
		try {
            const tags:any = await DB.tags.all();
            res.json(tags);
		} catch (error) {
			console.log(error);
			res.status(500).json('My code sucks.');
		}
});

export default router;