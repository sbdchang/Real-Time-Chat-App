import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlToUse } from "./url";
import './CreateAccount.css';

export default class CreateAccount extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			// movieName: "",
			// recMovies: []
			username: "",
			email: "",
			password: "",
			pin: "",
			rusername: "",
			rpin: "",
			rpassword: "",
			lusername: "",
			lpassword: ""
		}

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handlePinChange = this.handlePinChange.bind(this);
		this.handleLoginUsernameChange = this.handleLoginUsernameChange.bind(this);
		this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
		this.handleResetPasswordUsernameChange = this.handleResetPasswordUsernameChange.bind(this);
		this.handleResetPinChange = this.handleResetPinChange.bind(this);
		this.handleResetPasswordChange = this.handleResetPasswordChange.bind(this);
		this.createAcct = this.createAcct.bind(this);
		this.loginAcct = this.loginAcct.bind(this);
		this.resetPassword = this.resetPassword.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({
			username: e.target.value
		});
	}

	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		});
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		});
	}

	handlePinChange(e) {
		this.setState({
			pin: e.target.value
		});
	}

	handleLoginUsernameChange(e) {
		this.setState({
			lusername: e.target.value
		});
	}

	handleLoginPasswordChange(e) {
		this.setState({
			lpassword: e.target.value
		});
	}

	handleResetPasswordUsernameChange(e) {
		this.setState({
			rusername: e.target.value
		});
	}

	handleResetPinChange(e) {
		this.setState({
			rpin: e.target.value
		});
	}

	handleResetPasswordChange(e) {
		this.setState({
			rpassword: e.target.value
		});
	}

	async createAcct() {
		let messageOne = document.querySelector("#message-1");
		messageOne.textContent = "";
		await fetch(`${urlToUse.url.API_URL}/users/register?username=${this.state.username}&email=${this.state.email}&password=${this.state.password}&pin=${this.state.pin}`, {
			method: "POST"
		}).then((data) => {
			if (data.status === 400) {
				console.log(data);
				return messageOne.textContent = "Invalid information. Please try again. ";
			} else if (data.status === 460) {
				console.log(data);
				return messageOne.textContent = "Username or email already exists.";
			} else if (data.status === 461) {
				console.log(data);
				return messageOne.textContent = "Invalid email.";
			} else if (data.status === 462) {
				console.log(data);
				return messageOne.textContent = "Invalid password.";
			} else if (data.status === 463) {
				console.log(data);
				return messageOne.textContent = "Invalid PIN.";
			} else if (data.status === 464) {
				console.log(data);
				return messageOne.textContent = "All fields are required.";
			}
			return messageOne.textContent = "Account created.";
		}).catch((err) => {
			// Print the error if there is one
			messageOne.textContent = "Could not log in at this time. Please try again later.";
		})
	}

	async loginAcct(e) {
		let messageTwo = document.querySelector("#message-2");
		messageTwo.textContent = "";
		console.log(urlToUse);
		console.log(window.location.href);

		await fetch(`${urlToUse.url.API_URL}/users/login/?username=${this.state.lusername}&password=${this.state.lpassword}`, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				if (response.status === 200) {
					response.json().then(r => {
						messageTwo.textContent = "Login successful.";
						// e.preventDefault();
						localStorage.setItem('token', r.token);
						localStorage.setItem('username', this.state.lusername);
						this.props.changeUsername(this.state.lusername); // to pass username
						window.location.href = `/mainview?username=${this.state.lusername}`;
					})
				}
			} else if (response.status === 401) {
				messageTwo.textContent = "Too many unsuccessful login attempts. Account locked down for XXX. Try again later.";
			} else if (response.status === 400) {
				messageTwo.textContent = "Incorrect login credentials. Please try again.";
			} else {
				messageTwo.textContent = "Account under lockdown for XXX. Try again later.";
			}
		}).catch((err) => {
			// Print the error if there is one
			messageTwo.textContent = "Unable to log in at this time. Please try again later.";
		});
	}

	async resetPassword() {
		let messageThree = document.querySelector("#message-3");
		messageThree.textContent = "";
		console.log(urlToUse);

		await fetch(`${urlToUse.url.API_URL}/users/login/reset?username=${this.state.rusername}&rpin=${this.state.rpin}&rpassword=${this.state.rpassword}`, {
			method: "POST"
		}).then((response) => {
			if (response.status === 200) {
				messageThree.textContent = "Password reset successful. Please log in with your new password.";
			} else if (response.status === 401) {
				messageThree.textContent = "Too many unsuccessful password reset attempts. Account locked down for XXX. Try again later.";
			} else if (response.status === 400) {
				messageThree.textContent = "Incorrect password reset credentials. Please try again.";
			} else {
				messageThree.textContent = "Account under lockdown for XXX. Try again later.";
			}
		}).catch((err) => {
			// Print the error if there is one
			messageThree.textContent = "Unable to reset password at this time. Please try again later.";
		});
	}

	render() {
		return (
			<div className="CreateAccount">
				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Create An Account</div>
						<br></br>
						<div className="input-container">
							<input type='text' placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} id="username" className="username-input" />
							<input type='text' placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} id="email" className="email-input" />
							<input type='text' placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} id="password" className="password-input" />
							<input type='text' placeholder="Reset PIN" value={this.state.pin} onChange={this.handlePinChange} id="pin" className="pin-input" />
							<button id="createAccounttBtn" className="createAcct-btn" onClick={this.createAcct}>Create Account</button>
						</div>

						<div className="results-container" id="results">
							{/* {this.state.recMovies} */}
							<p id="message-1">  </p>
						</div>

						<br></br>
						<br></br>

						<div className="h5">Log In</div>
						<br></br>

						<div className="input-container-login">
							{/* <input type='text' placeholder="Enter movie" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/> */}
							<input type='text' placeholder="Username" value={this.state.lusername} onChange={this.handleLoginUsernameChange} id="lusername" className="lusername-input" />
							<input type='text' placeholder="Password" value={this.state.lpassword} onChange={this.handleLoginPasswordChange} id="lpassword" className="lpassword-input" />
							<button id="loginBtn" className="login-btn" onClick={this.loginAcct.bind(this)}>Log In</button>
						</div>

						<div className="results-container" id="results">
							{/* {this.state.recMovies} */}
							<p id="message-2">  </p>
						</div>

						<br></br>
						<br></br>

						<div className="h5">Reset Password</div>
						<br></br>

						<div className="input-container-resetpassword">
							{/* <input type='text' placeholder="Enter movie" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/> */}
							<input type='text' placeholder="Username" value={this.state.rusername} onChange={this.handleResetPasswordUsernameChange} id="rusername" className="rusername-input" />
							<input type='text' placeholder="Reset PIN" value={this.state.rpin} onChange={this.handleResetPinChange} id="rpin" className="rpin-input" />
							<input type='text' placeholder="New Password" value={this.state.rpassword} onChange={this.handleResetPasswordChange} id="rpassword" className="rpassword-input" />
							<button id="resetBtn" className="reset-btn" onClick={this.resetPassword}>Reset Password</button>
						</div>

						<div className="results-container" id="results">
							{/* {this.state.recMovies} */}
							<p id="message-3">  </p>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
