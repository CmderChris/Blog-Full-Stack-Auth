import { Router } from 'express';
import db from '../db';

const router = Router();

// get all blogs or individual blog by id
router.get('/:blogid?', async (req, res) => {
	const blogid = req.params.blogid;
	if (blogid) {
		try {
            const [blog] = await db.blogs.one(blogid);
            res.json(blog);
		} catch (error) {
			console.log(error);
			res.status(500).json('My code sucks.');
		}
	} else {
		try {
			const blogs = await db.blogs.all();
			res.json(blogs);
		} catch (error) {
			console.log(error);
			res.status(500).json('My code sucks.');
		}
	}
});

router.post('/', async (req, res) => {
    try {
        let result = await db.blogs.post(req.body.title, req.body.content, req.body.authorid)
        let blogid = result.insertId
        let tagid = req.body.tagid
        await db.blogtags.insert(blogid, tagid);
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.put('/:blogid', async (req, res) => {
	let id = req.params.blogid;
    let title = req.body.title;
    let content = req.body.content;
    try {
        return res.json(await db.blogs.put(title, content, id))
    } catch (e) {
        console.log(e)
        res.status(500).json('My code sucks.');
    }
})

router.delete('/:blogid', async (req, res) => {
    let blogid = req.params.blogid
    try {
        await db.blogtags.destroy(blogid);
        res.json(await db.blogs.remove(blogid))
    } catch (e) {
        console.log(e)
        res.status(500).json('My code sucks.');
    }
})

export default router;