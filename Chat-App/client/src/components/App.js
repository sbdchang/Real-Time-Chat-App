import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Mainview from './Mainview';
import UserProfile from './UserProfile';
import CreateAccount from './CreateAccount';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<CreateAccount />
							)}
						/>
						<Route
							exact
							path="/mainview"
							render={() => (
								<Mainview />
							)}
						/>
						<Route
							path="/createaccount"
							render={() => (
								<CreateAccount />
							)}
						/>
						<Route
							path="/userprofile"
							render={() => (
								<UserProfile />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}