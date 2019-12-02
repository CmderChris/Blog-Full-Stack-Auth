import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from "./pages/Edit";
import Info from "./pages/Info";
import Compose from './pages/Compose';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/editing/:id" component={Edit} />
				<Route exact path="/info/:id" component={Info} />
				<Route exact path="/compose" component={Compose} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
			</Switch>
		</Router>
	);
}

export interface IAppProps {}

export interface IAppState {}

export default App;
