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
		// console.log(this.state.temp);
		const u = this.state.temp;
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact path="/"
							component={() => (
								<CreateAccount changeUsername={this.changeState.bind(this)}/>
							)}
						/>
						<Route
							exact path="/userprofile"
							component={() => (
								<UserProfile changedUsername={u}/>
							)}
						/>
						<Route
							exact path="/mainview"
							component={() => (
								<Mainview />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}