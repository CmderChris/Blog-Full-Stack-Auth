import * as mysql from 'mysql';
import config from '../config';

const connection = mysql.createConnection(config.mysql);

connection.connect(() => console.log('Database successfully connected!'));

export const Query = <T = any>(query: string, values?: any) => {
	return new Promise<T>((resolve, reject) => {
		connection.query(query, values, (err, results) => {
			if (err) reject(err);
			resolve(results);
		});
	});
};

import blogs from './queries/blogs';
import authors from './queries/authors';
import blogtags from './queries/blogtags';
import tags from './queries/tags';

export default {
	blogs,
	authors,
	blogtags,
	tags
}