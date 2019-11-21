import { Query } from '../index';

const tagsForBlog = (id:string) => Query('CALL spBlogTags(?);', [id]);

const insert = (blogid:number, tagid:string) => Query('INSERT INTO blogtags (blogid, tagid) values (?)', [[blogid, tagid]]);

const destroy = (blogid:string) => Query('DELETE FROM blogtags WHERE blogid =?', [blogid]);

export default {
    tagsForBlog,
    insert,
    destroy
}