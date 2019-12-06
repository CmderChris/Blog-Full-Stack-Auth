import * as React from 'react';
import { useState, useEffect } from 'react';
import { json, setStorage, Author } from '../utils/api';
import { RouteComponentProps } from "react-router-dom";
import { Link } from 'react-router-dom';

const Login: React.FC<LoginProps> = props => {
    // const [login, setLogin] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (Author && Author.role === "guest") {
            props.history.push('/')
        }
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/auth/login', 'POST', { email, password });
            setStorage(response.token, { authorid: response.authorid, role: response.role })
            props.history.push(`/`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">Login!</h1>
                </main>
            </div>

            <div>
                <div className="col-md-8 offset-md-2">
                    <form className="form-group border border-primary rounded shadow-sm p-3 mt-4">

                        <label className="text-info">Email:</label>
                        <input
                            type="email"
                            className="form-control p-1 mb-1"
                            placeholder="Type your email here..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <label className="text-info mt-2">Password:</label>
                        <input
                            type="password"
                            className="form-control p-1 mb-1"
                            placeholder="Type your password here..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-md mt-3"
                            onClick={handleSubmit}>
                            Login!
                        </button>

                        <Link
                            to={`/signup`}
                            className="btn btn-outline-info btn-md mt-3 mx-3">
                            Not Registered? Sign Up!
                        </Link>

                    </form>
                    {props.location.state && <div className="alert alert-danger text-center">{props.location.state.msg}</div>}
                </div>
            </div>

        </>
    );
}

interface LoginProps extends RouteComponentProps<{ id: string }> { }

export default Login;