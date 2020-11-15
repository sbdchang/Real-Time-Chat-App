import React from 'react';
import PageNavbar from './PageNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from './avatar.png';

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "N/A",
			date: "N/A"
		};

		this.changePassword = this.changePassword.bind(this);
		this.deactivateAccount = this.deactivateAccount.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	async componentDidMount() {
		this.setState({
			username: await window.location.href.split('=').pop()
		});
		await fetch(`http://localhost:8081/users?username=${this.state.username}`, {
			method: "GET" 
		}).then(response => response.json()).then((response) => {
			console.log(response.status);
			console.log(response.dateRegistered);
			this.setState({
				date: response.dateRegistered.substr(0, response.dateRegistered.indexOf('T'))
			});
		})
	}

	async changePassword() {
		let messageOne = document.querySelector("#message-1");
		messageOne.textContent = "";
		const cpw = document.getElementById('cpw').value;
		const npw = document.getElementById('npw').value;
		if (cpw == npw) {
			messageOne.textContent = "Try a Different New Password!";
		} else {
			await fetch(`http://localhost:8081/users/change?username=${this.state.username}&cpw=${cpw}&npw=${npw}`, {
				method: "POST" 
			}).then((response) => {
				if (response.status === 200) {
					messageOne.textContent = "Password Changed";
				} else {
					messageOne.textContent = "Incorrect Current Password"
				}
			})
		}
	}

	deactivateAccount() {
		this.setState({
			username: "N/A",
			date: "N/A"
		});
		let messageOne = document.querySelector("#message-2");
		messageOne.textContent = "Account Deactivated";
	}

	logOut() {
		window.location.href = "/";
	}

	render() {	
		return (
			<div className="UserProfile">
				<PageNavbar active="userprofile" />
				<div className="container bestgenres-container">
			      <div className="jumbotron">
		            <div className="h5">{`Username: ${this.state.username}`}</div>
					<div className="h6">{`Regestration Time: ${this.state.date}`}</div>
					<img src={avatar}/>
			      </div>

			      <div className="jumbotron">
				  <input type='text' placeholder="Current Password" id="cpw" className="input"/>
				  <input type='text' placeholder="New Password" id="npw" className="input"/>
				  <button id="cp" className="btn" onClick={this.changePassword}>Change Password</button>
				  <div className="results-container" id="results">
			    		<p id = "message-1">  </p>
			      </div>
				  <br></br>
				  <input type='text' placeholder="Current Password" id="dcpw" className="input"/>
				  <button id="da" className="btn" onClick={this.deactivateAccount}>Deactivate Account</button>
				  <div className="results-container" id="results">
			    		<p id = "message-2">  </p>
			      </div>
				  <br></br>
				  <button id="lo" className="btn" onClick={this.logOut}>Log Out</button>
			      </div>
			    </div>
			</div>
		);
	}
}
