import { Router, Request, RequestHandler } from 'express';
import DB from '../../db';

const router = Router(); 

const isGuest: RequestHandler = (req: Req, res, next) => {
    if (!req.user || req.user.role !== 'guest') {
        return res.sendStatus(401);
    } else {
        return next();
    }
};

router.get('/', async (req, res, next) => {
    try {
        let blogs = await DB.blogs.getAll();
        res.send(blogs);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/:id', async (req, res, next) => {
    let id = req.params.id;
    try {
        let blog = await DB.blogs.getSingleBlog(id);
        res.send(blog);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/', isGuest, async (req, res) => {
    try {
        let result = await DB.blogs.postBlog(req.body.title, req.body.content, req.body.authorid)
        let blogid = result.insertId
        let tagid = req.body.tagid
        await DB.blogtags.insert(blogid, tagid);
        res.json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
})

router.put('/:blogid', isGuest, async (req, res) => {
	let id = req.params.blogid;
    let title = req.body.title;
    let content = req.body.content;
    try {
        return res.json(await DB.blogs.editBlog(title, content, id))
    } catch (e) {
        console.log(e)
        res.status(500).json('My code sucks.');
    }
})

router.delete('/:blogid', isGuest, async (req, res) => {
    let blogid = req.params.blogid
    try {
        await DB.blogtags.destroy(blogid);
        res.json(await DB.blogs.deleteBlog(blogid))
    } catch (e) {
        console.log(e)
        res.status(500).json('My code sucks.');
    }
})

interface Req extends Request {
    user: {
        id: number,
        role: string
    }
}

export default router;