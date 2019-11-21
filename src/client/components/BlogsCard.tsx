import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { IBlogTags } from '../utils/interface'

const BlogsCard: React.FC<BlogsCardProps> = props => {
    const [blogtag, setBlogTag] = useState<{ id: number, name: string }[]>([
        {
            id: 0,
            name: ''
        }
    ]);

    useEffect(() => {
        (async () => {
            try {
                let blogtag = await json(`/api/blogtags/${props.blog.id}`);
                setBlogTag(blogtag);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <div className="col-md-8 offset-md-2">
                <article className="card my-3 shadow-sm border border-primary">
                    <div className="card-header text-center bg-secondary">
                        <h4 className="card-title text-white mt-1">{props.blog.title}</h4>
                    </div>

                    <div className="card-body text-center">
                        <p className="card-text text-info">{props.blog.content.substring(0, 150)}...</p>
                        <Link to={`/info/${props.blog.id}`} className="btn btn-outline-primary btn-md mt-3">Read Blog!</Link>
                    </div>
                    <div className="card-body text-center">
                        {blogtag.map((tag, i) => {
                            return (
                                <span key={i} className="badge badge-pill badge-primary text-white mx-2 mb-2">
                                    #{tag.name}
                                </span>
                            )
                        })}
                    </div>
                    <div className="card-footer text-center bg-secondary">
                        <p className="text-white mb-0">created by: {props.blog.author}</p>
                        <p className="text-white mb-0">on: {moment(props.blog._created).format("MMM Do YYYY")}</p>
                    </div>
                </article>
            </div>
        </>
    );
}

interface BlogsCardProps {
    blog: { id: number, title: string, content: string, author: string, _created: string },

}

export default BlogsCard;