import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Mainview from './Mainview';
import UserProfile from './UserProfile';
import CreateAccount from './CreateAccount';
import Statuses from './Statuses';
import VideoChat from './VideoChat';

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
						<Route
							exact path="/statuses"
							render={() => (
								<Statuses />
							)}
						/>
						<Route
							exact path="/videochat"
							render={() => (
								<VideoChat />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
