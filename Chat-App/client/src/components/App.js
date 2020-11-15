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
	constructor(props) {
		super(props);
		this.state = {
			temp: "username"
		}
	}

	async changeState(u) {
		await this.setState({
			temp: u
		});
	}
	
	render() {
		console.log(this.state.temp);
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact path="/"
							render={() => (
								<CreateAccount changeUsername={this.changeState.bind(this)}/>
							)}
						/>
						<Route
							exact path="/userprofile"
							render={() => (
								<UserProfile changedUsername={this.state.temp}/>
							)}
						/>
						<Route
							exact path="/mainview"
							render={() => (
								<Mainview />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}