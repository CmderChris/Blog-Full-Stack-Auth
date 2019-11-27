import { Router } from 'express';
import DB from '../../db';

const router = Router();

router.get('/:id', async (req, res) => {
    let blogid = req.params.id
		try {
            const blogtags:any = await DB.blogtags.tagsForBlog(blogid);
            res.json(blogtags[0]);
		} catch (error) {
			console.log(error);
			res.status(500).json('My code sucks.');
		}
});

export default router;