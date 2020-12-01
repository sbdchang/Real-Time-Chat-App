import React from 'react';
import PageNavbar from './PageNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import avatar from './avatar.png';
import {urlToUse} from "./url";
import axios from 'axios';

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "N/A",
			date: "N/A",
			active: "N/A"
		};

		this.postStatus = this.postStatus.bind(this);
		this.postImageStatus = this.postImageStatus.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.deactivateAccount = this.deactivateAccount.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	async componentDidMount() {
		this.setState({
			username: await window.location.href.split('=').pop()
		});
		await fetch(`${urlToUse.url.API_URL}/users/date?username=${this.state.username}`, {
			method: "GET"
		}).then(response => response.json()).then((response) => {
			if (response.activeRecord === 0) {
				this.setState({active: "Active"})
			} else if (response.activeRecord === 1) {
				this.setState({active: "Deactivated"})
			}
			this.setState({
				// date: response.dateRegistered
				date: response.dateRegistered.substr(0, response.dateRegistered.indexOf('T')),
			});
		})
	}

	async postStatus() {
		let messageThree = document.querySelector("#message-3");
		messageThree.textContent = "";
		const newStatus = document.getElementById("postStatus").value;
		if (!newStatus || newStatus === "") {
			messageThree.textContent = "Status cannot be empty.";
		} else {
			await fetch(`${urlToUse.url.API_URL}/status/postStatus?username=${this.state.username}&statusContent=${newStatus}`, {
				method: "POST"
			}).then((response) => {
				messageThree.textContent = "Status posted.";
			})
		}
	}

	postImageStatus = async(event) => {
		let messageThree = document.querySelector("#message-3");
		messageThree.textContent = "";
		const file = event.target.files;
    	if (file && file[0]) {
			// console.log("File selected");
			// const image = await URL.createObjectURL(file[0]);
			// await fetch(`${urlToUse.url.API_URL}/status/postImageStatus?username=${this.state.username}&statusImage=${image}`, {
			// 	method: "POST"
			// }).then((response) => {
			// 	messageThree.textContent = "Status posted.";
			// })
			const image = file[0];
			let formData = new FormData();
			formData.append("image", image);
			fetch(`${urlToUse.url.API_URL}/status/postImageStatus?username=${this.state.username}`, {
				method: "POST",
				body: formData
			}).then(resp => resp.json())
			.then(data => {
			   if (data.errors) {
				  alert(data.errors)
			   }
			   else {
				  console.log(data)
			   }
			})
		}
	}

	async changePassword() {
		let messageOne = document.querySelector("#message-1");
		messageOne.textContent = "";
		const cpw = document.getElementById('cpw').value;
		const npw = document.getElementById('npw').value;
		if (cpw === npw) {
			messageOne.textContent = "Try a Different New Password!";
		} else {
			await fetch(`${urlToUse.url.API_URL}/users/change?username=${this.state.username}&cpw=${cpw}&npw=${npw}`, {
				method: "POST" 
			}).then((response) => {
				if (response.status === 200) {
					messageOne.textContent = "Password Changed";
				} else if (response.status === 400) {
					messageOne.textContent = "Incorrect corrent password!"
				} else if (response.status === 401) {
					messageOne.textContent = "Password must be at least 8 characters long!"
				} else if (response.status === 402) {
					messageOne.textContent = "Password must not contain 'password'!"
				} else if (response.status === 403) {
					messageOne.textContent = "Password must contain at least one special character!"
				} else if (response.status === 404) {
					messageOne.textContent = "Account under lockdown!"
				}
			})
		}
	}

	deactivateAccount() {
		let messageOne = document.querySelector("#message-2");
		if (this.state.active === "Deactivated") {
			messageOne.textContent = "The account is already deactivated";
		} else {
			axios.post(`${urlToUse.url.API_URL}/users/deactivate?username=${this.state.username}`);
			messageOne.textContent = "Account Deactivated";
		}
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
				    <img src={avatar} width = "50" height = "50"/>
		            <div>{`Username: ${this.state.username}`}</div>
					<div>{`Status: ${this.state.active}`}</div>
					<div>{`Regestration Time: ${this.state.date}`}</div>
			      </div>

				  <div className="jumbotron">
				  	<input type='text' placeholder="What's up?" id="postStatus" className="input"/>
					<button id="cp" className="btn" onClick={this.postStatus}>Post Status</button>
					<br></br>
					<input type="file" onChange={this.postImageStatus} className="filetype" id="image_inpt"/>
					<div className="results-container" id="results">
			    		<p id = "message-3">  </p>
			      	</div>
			      </div>

			      <div className="jumbotron">
				     <b style={{fontSize: "30px"}}> User Settings </b>
					 <br></br>
					 <br></br>
				  	<input type='text' placeholder="Current Password" id="cpw" className="input"/>
				  	<input type='text' placeholder="New Password" id="npw" className="input"/>
				  	<button id="cp" className="btn" onClick={this.changePassword}>Change Password</button>
				  	<div className="results-container" id="results">
			    		<p id = "message-1">  </p>
			      	</div>
				  	<button id="da" className="btn" onClick={this.deactivateAccount}>Deactivate Account</button>
				  	<div className="results-container" id="results">
			    		<p id = "message-2">  </p>
			      	</div>
				  	<button id="lo" className="btn" onClick={this.logOut}>Log Out</button>
			      </div>
			    </div>
			</div>
		);
	}
}



