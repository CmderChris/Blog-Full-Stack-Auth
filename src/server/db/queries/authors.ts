import { Query } from '../index';

const findAll = () => Query<{}[]>('SELECT id, firstname, role FROM authors');

const findOneByEmail = async (email: string) => Query<{ password:string }[]>(`SELECT * FROM authors WHERE email =?`, [email]);

const findOneById = async (id: string) => Query<{}[]>(`SELECT * FROM authors WHERE id=?`, [id]);

const insert = async (author: any) => Query(`INSERT INTO authors SET ?`, [author]);

export default {
    findAll,
    findOneByEmail,
    findOneById,
    insert
}