import * as React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Form from '../components/Form';

class Donate extends React.Component<IDonateProps, IDonateState> {
	constructor(props: IDonateProps) {
		super(props);
	}

	render() {
		return (
			<>
				<StripeProvider apiKey="pk_test_z2GD7DVbVuZ0GLIghGyCMpfa">
					<Elements>
						<Form />
					</Elements>
				</StripeProvider>
			</>
		);
	}
}

export interface IDonateProps { }

export interface IDonateState { }

export default Donate;