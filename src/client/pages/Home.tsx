import * as React from 'react';
import { useState, useEffect } from 'react';
import { json } from '../utils/api';
import { RouteComponentProps } from 'react-router-dom';
import BlogsCard from '../components/BlogsCard';

const Home: React.FC<HomeProps> = props => {
    const [blogs, setBlogs] = useState<{id:number, title:string, content:string, author:string, _created:string}[]>([]);

    useEffect(() => {
        (async () => {
            try {
                let blogs = await json('/api/blogs');
                setBlogs(blogs);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">Blogs!</h1>
                </main>
            </div>

            {blogs.map(blog => (
                <BlogsCard key={`blogscard-${blog.id}`} blog={blog} />
            ))}
        </>
    )
}

interface HomeProps extends RouteComponentProps {}

export default Home;