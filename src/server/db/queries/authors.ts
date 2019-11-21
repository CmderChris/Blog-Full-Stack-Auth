import { Query } from '../index';

const all = () => Query<{}[]>('SELECT id, name FROM authors');

export default {
    all
}