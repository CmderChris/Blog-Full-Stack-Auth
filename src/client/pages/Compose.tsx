import * as React from 'react';
import { useState, useEffect } from 'react';
import { json, Author } from '../utils/api';
import { RouteComponentProps } from 'react-router-dom';

const Compose: React.FC<ComposeProps> = props => {
    const [content, setContent] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    // const [authorid, setAuthorid] = useState<string>('1');
    // const [authors, setAuthors] = useState<{ id: number, firstname: string }[]>([]);
    const [tagid, setTagid] = useState<string>('1');
    const [tag, setTag] = useState<{ id: number, name: string }[]>([
        {
            id: 0,
            name: ''
        }
    ]);

    useEffect(() => {
        (async () => {
            try {
                // let authors = await json('/api/authors');
                // setAuthors(authors);
                let tag = await json(`/api/tags/`);
                setTag(tag);
                if (!Author || Author.authorid === null || Author.role !== 'guest') {
                    props.history.replace('/login', {msg:'You must be logged in to view this page!'});
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/api/blogs', 'POST', { authorid: Author.authorid, title, content, tagid });
            console.log(response.insertId);
            props.history.push(`/info/${response.insertId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">Add a Blog!</h1>
                </main>
            </div>

            <div>
                <div className="col-md-8 offset-md-2">
                    <form className="form-group border border-primary rounded shadow-sm p-3 mt-4">

                        {/* <label className="text-info">Select User:</label>
                        <select 
                            value={authorid} 
                            onChange={e => setAuthorid(e.target.value)} 
                            className="form-control my-1 text-center">
                            {authors.map(author => (
                                <option key={`author-${author.id}`} value={author.id}>{author.firstname}</option>
                            ))}
                        </select> */}

                        <label className="text-info mt-2">Blog Title:</label>
                        <input
                            type="text"
                            placeholder="Type your title here..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="form-control my-1"
                        />

                        <label className="text-info mt-2">Blog Content:</label>
                        <textarea
                            rows={8}
                            placeholder="Type your content here..."
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="form-control my-1"
                        />

                        <label className="text-info mt-2">Select a Tag:</label>
                        <select
                            value={tagid}
                            onChange={e => setTagid(e.target.value)}
                            className="form-control my-1 text-center">
                            {tag.map((tag) => (
                                <option key={`tag-${tag.id}`} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>

                        <button
                            className="btn btn-outline-primary btn-lg mt-3 mb-2"
                            onClick={handleSubmit}>
                            Post!
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

interface ComposeProps extends RouteComponentProps { }

export default Compose;