export interface IBlog {
    id: number;
    title: string;
    content: string;
    author: number;
    _created: Date;
}

export interface IBlogTags {
	id: number,
	name: string
}