import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { IBlogTags } from '../utils/interface'

const Info: React.FC<InfoProps> = props => {
    const [blog, setBlog] = useState<{ id: number, title: string, content: string, author: string, _created: string }>({
        id: 0, title: '', content: '', author: '', _created: ''
    });
    const [blogtag, setBlogTag] = useState<{id: number, name: string}[]>([
        {
            id: 0,
            name: ''
        }
    ]);

    useEffect(() => {
        (async () => {
            try {
                let blog = await json(`/api/blogs/${props.match.params.id}`);
                setBlog(blog);
                let blogtag = await json(`/api/blogtags/${props.match.params.id}`);
                setBlogTag(blogtag);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">{blog.title}</h1>
                </main>
            </div>

            <div className="col-md-10 offset-md-1">
                <article className="card my-2 shadow-sm border border-primary">
                    <div className="card-body text-center">
                        <p className="card-text text-justify text-info">
                            {blog.content.split('\n').map((paragraph, i) => {
                                return (
                                    <span key={i}>
                                        {paragraph}
                                        <br />
                                    </span>
                                )
                            })}
                        </p>
                    </div>

                    <div className="card-body text-center">
                        <Link to={`/editing/${props.match.params.id}`} className="btn btn-outline-primary btn-md mb-1">Edit Blog!</Link>
                    </div>
                    <div className="card-body text-center">
                        {blogtag.map((tag, i) => {
                            return (
                                <span key={i} className="badge badge-pill badge-primary text-white mx-2">
                                    #{tag.name}
                                </span>
                            )
                        })}
                    </div>
                    <div className="card-footer text-center bg-secondary">
                        <p className="text-white mb-0">created by: {blog.author}</p>
                        <p className="text-white mb-0">on: {moment(blog._created).format("MMM Do YYYY")}</p>
                    </div>
                </article>
            </div>
        </>
    )
}

interface InfoProps extends RouteComponentProps<{ id: string }> { }

export default Info;