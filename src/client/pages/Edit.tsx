import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../utils/api';
import { RouteComponentProps } from "react-router-dom";

const Edit: React.FC<EditProps> = props => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState<string>('');
    const [blogtags, setBlogTags] = useState<string>('');
    const [blog, setBlog] = useState<{ id: number, title: string, content: string, author: string, _created: string }>({
        id: 0, title: '', content: '', author: '', _created: ''
    });

    useEffect(() => {
        (async () => {
            try {
                let blog = await json(`/api/blogs/${props.match.params.id}`);
                setBlog(blog);
                let blogtags = await json(`/api/blogstags/${props.match.params.id}`);
                setBlogTags(blogtags);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response = await json(`/api/blogs/${props.match.params.id}`, 'DELETE');
            console.log(response);
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response = await json(`/api/blogs/${props.match.params.id}`, 'PUT', {title, content});
            console.log(response);
            props.history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">Edit Blog!</h1>
                </main>
            </div>
            <div>
                <div className="col-md-8 offset-md-2">
                    <article className="card my-2 shadow-sm border border-primary">
                        <div className="card-body text-center py-4">

                            <span className="text-info">Blog Title:</span>
                            <input type="text" defaultValue={blog.title} onChange={e => setTitle(e.target.value)}
                            className="form-control my-1 shadow-sm" />

                            <span className="text-info">Blog Content:</span>
                            <textarea rows={8} defaultValue={blog.content} onChange={e => setContent(e.target.value)} 
                             className="form-control my-1 shadow-sm" />

                        </div>

                        <div className="container text-center">
                            <button className="btn btn-outline-primary btn-lg mb-3" onClick={handleEdit}>Post Edit!</button>
                        </div>
                        <div className="container text-center">
                            <button className="btn btn-outline-info btn-sm mb-4" onClick={handleDelete}>Delete Blog!</button>
                        </div>

                    </article>
                </div>
                <div>

                </div>
            </div>
        </>
    );
}

interface EditProps extends RouteComponentProps<{ id: string }> { }

export default Edit;