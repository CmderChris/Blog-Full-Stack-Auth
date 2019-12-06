import * as React from 'react';
import { useState } from 'react';
import { json } from '../utils/api';
import { RouteComponentProps } from "react-router-dom";
import swal from 'sweetalert';

const Contact: React.FC<ContactProps> = props => {
    const [email, setEmail] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let response: any = await json('/api/contact', 'POST', { email, subject, message });
            console.log(response);
            swal({
                title: "Thank you!",
                text: "Your email has successfully been sent.",
                icon: "success"
            }).then(function() {
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">Contact!</h1>
                </main>
            </div>


            <div>
                <div className="col-md-8 offset-md-2">
                    <form className="form-group border border-primary rounded shadow-sm p-3 mt-4">
                        <label className="text-info">Your Email:</label>
                        <input
                            type="email"
                            placeholder="Type your email here..."
                            onChange={e => setEmail(e.target.value)}
                            className="form-control my-1"
                        />

                        <label className="text-info mt-2">Subject:</label>
                        <input
                            type="text"
                            placeholder="Type your subject here..."
                            onChange={e => setSubject(e.target.value)}
                            className="form-control my-1"
                        />

                        <label className="text-info mt-2">Message:</label>
                        <textarea
                            rows={8}
                            placeholder="Type your message here..."
                            onChange={e => setMessage(e.target.value)}
                            className="form-control my-1"
                        />

                        <button
                            className="btn btn-outline-primary btn-lg mt-3"
                            onClick={handleSubmit}>
                            Send!
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}

interface ContactProps extends RouteComponentProps<{ id: string }> { }

export default Contact;