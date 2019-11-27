import { Query } from "../index";

const returnMyQuery = async (query: any, values?: any) => console.log(query, values);

const getAll = async () => Query<[]>(`SELECT b.id, a.firstname AS author, a.role, b.title, b.content, b._created FROM blogs b JOIN authors a ON a.id = b.userid ORDER BY _created DESC`);

const getSingleBlog = async (id: string) => Query<{}[]>(`SELECT b.id, a.firstname AS author, a.role, b.title, b.content, b._created FROM blogs b JOIN authors a ON a.id = b.userid WHERE b.id =?`, [id]);

const deleteBlog = async (id: string) => Query<{}>(`DELETE FROM blogs WHERE id =?`, [id]);

const postBlog = async (title: string, content: string, userid: number) => Query<{insertId:number}>(`INSERT INTO blogs (title, content, userid) VALUES (?)`, [[title, content, userid]]);

const editBlog = async (title: string, content: string, id: string) => Query<{}>(`UPDATE blogs SET title=?, content=? WHERE id=?`, [title, content, id]);


export default {
    getAll,
    getSingleBlog,
    postBlog,
    editBlog,
    deleteBlog
}