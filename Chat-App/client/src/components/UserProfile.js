import React from 'react';
import PageNavbar from './PageNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios');

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: "1"
		};
	}

	componentDidMount() {
		const res = axios.get('http://localhost:8081/users');
		// fetch(`http://localhost:8081/users/login/?username=q&password=qqqqqq@1`, {
		// 	method: "POST"
		// }).then((response) => {
		// 	this.setState({
		// 		date: "3"
		// 	});
		// })
	}

	// async getDate(e) {

	// }

	render() {
		
		return (
			<div className="UserProfile">
				<PageNavbar active="userprofile" />
				<div className="container bestgenres-container">
			      <div className="jumbotron">
		            <div className="h5">{this.props.changedUsername}</div>
					<div className="h6">{this.state.date}</div>
			      </div>
			
			      <div className="jumbotron">
				  <input type='text' placeholder="New Password" id="cpassword" className="cpassword-input"/>
				  <button id="change" className="change-btn">Change Password</button>
			      </div>
			    </div>
			</div>
		);
	}
}