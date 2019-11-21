import { Query } from '../index';

const all = () => Query<[]>('SELECT b.id, a.name AS author, b.title, b.content, b._created FROM blogs b JOIN authors a ON a.id = b.authorid ORDER BY _created DESC;');
const one = (id: string) => Query<{}[]>('SELECT b.id, a.name AS author, b.title, b.content, b._created FROM blogs b JOIN authors a ON a.id = b.authorid WHERE b.id = ?', [id]);
const remove = (id: string) => Query<{}>(`DELETE FROM blogs WHERE id =?`, [id]);
const post = async (title: string, content: string, authorid: number) => Query<{insertId:number}>(`INSERT INTO blogs (title, content, authorid) VALUES (?)`, [[title, content, authorid]]);
const put = async (title: string, content: string, id: string) => Query<{}>(`UPDATE blogs SET title=?, content=? WHERE id=?`, [title, content, id]);

export default {
    all,
    one,
    remove,
    post,
    put
}

