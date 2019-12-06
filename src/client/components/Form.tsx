import * as React from 'react';
import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements';
import swal from 'sweetalert';

class Form extends React.Component<IFormProps, IFormState> {

    constructor(props: IFormProps) {
        super(props);
        this.state = {
            name: "",
            amount: ""
        };
    }

    handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let { token } = await this.props.stripe.createToken({ name: this.state.name });
            let amount = this.state.amount;
            await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ token, amount })
            })
            // redirect, clear inputs, thank you alert, etc
            swal({
                title: "Complete!",
                text: "Thank you for your donation.",
                icon: "success"
            }).then(function() {
                window.location.reload();
            });
        } catch (e) {
            throw e;
        }
    }

    render() {
        return (
            <>
            <div className="bg-secondary">
                <main className="container py-5">
                    <h1 className="text-center text-white">Donate!</h1>
                </main>
            </div>

            <main className="col-md-8 offset-md-2">
                <form 
                    className="form-group mt-4 border border-primary rounded p-3"
                    onSubmit={this.handleSubmit}
                >

                    <label className="text-info">Name:</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border rounded"
                        value={this.state.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                    />

                    <label className="text-info mt-2">Amount:</label>
                    <input
                        type="text"
                        className="input-group my-1 p-1 border rounded"
                        value={this.state.amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ amount: e.target.value })}
                    />

                    <label className="text-info mt-2">Card Info:</label>
                    <CardElement
                        className="p-2 border rounded mt-1"
                        // onReady={(element) => this._element = element}
                    />

                    <button
                        className="btn btn-outline-primary btn-lg mt-3">
                        Charge!
                    </button>

                </form>
            </main>
            </>
        );
    }
}

interface IFormProps extends ReactStripeElements.InjectedStripeProps { }

interface IFormState {
    name: string;
    amount: string;
}

export default injectStripe(Form);