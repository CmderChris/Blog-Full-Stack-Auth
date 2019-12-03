import * as React from 'react';
import { useState, useEffect } from 'react';
import { json, setStorage, Author } from '../utils/api';
import { RouteComponentProps } from "react-router-dom";

const SignUp: React.FC<SignUpProps> = props => {
    // const [signup, setSignup] = useState('');
    const [firstname, setFirstname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if ( Author && Author.role === "guest") { 
            props.history.push('/') 
        }
    }, []);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/auth/register', 'POST', { firstname, email, password });
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
                    <h1 className="text-center text-white">Sign Up!</h1>
                </main>
            </div>

            <div>
                <div className="col-md-8 offset-md-2">
                    <form className="form-group border border-primary rounded shadow-sm p-3 mt-5">
                        <label className="text-info">First Name:</label>
                        <input
                            type="name"
                            className="form-control p-1 mb-1"
                            placeholder="Type your first name here..."
                            value={firstname} 
                            onChange={e => setFirstname(e.target.value)}
                        />

                        <label className="text-info mt-2">Email:</label>
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
                        
                        {/* 
                        <label className="text-info mt-2">Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control p-1 mb-1"
                            placeholder="Type your password again here..."
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        /> */}

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-lg mt-3"
                            onClick={handleSubmit}>
                            Sign Up!
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}

interface SignUpProps extends RouteComponentProps<{ id: string }> { }

export default SignUp;