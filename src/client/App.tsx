import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from "./pages/Edit";
import Info from "./pages/Info";
import Compose from './pages/Compose';
import Navbar from './components/Navbar';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/editing/:id" component={Edit} />
				<Route exact path="/info/:id" component={Info} />
				<Route exact path="/compose" component={Compose} />
			</Switch>
		</Router>
	);
}

export interface IAppProps {}

export interface IAppState {}

export default App;
