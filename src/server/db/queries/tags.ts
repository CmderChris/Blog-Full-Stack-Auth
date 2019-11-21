import { Query } from '../index';

const all = () => Query('SELECT * from tags');

export default {
    all
}