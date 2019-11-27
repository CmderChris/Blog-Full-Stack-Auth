import * as mysql from 'mysql';
import config from '../config';

export const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {
	return new Promise<T>((resolve, reject) => {
		pool.query(query, values, (err, results) => {
			if (err) reject(err);
			resolve(results);
		});
	});
};

import blogs from './queries/blogs';
import authors from './queries/authors';
import tokens from './queries/tokens';
import blogtags from './queries/blogtags';
import tags from './queries/tags';

export default {
	blogs,
	authors,
	tokens,
	blogtags,
	tags
}