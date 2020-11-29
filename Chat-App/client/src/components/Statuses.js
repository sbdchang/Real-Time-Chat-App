import React from 'react';
import PageNavbar from './PageNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {urlToUse} from "./url";

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "N/A",
			date: "N/A",
			statuses: []
		};
	}

	pullStatuses() {
		axios.get(`${urlToUse.url.API_URL}/status`)
		  .then(res => {
			  
			const statuses = res.data;
			var validStatuses = [];
			var map = {};
			for(var i = 0; i < statuses.length; i++) {
				validStatuses.push(statuses[i]);
				map[statuses[i].username] = [];
			}
			this.setState({
				statuses: validStatuses
			})
			// console.log(this.state.statuses);
		  })
	  }

	async componentDidMount() {
		this.setState({
			username: await window.location.href.split('=').pop()
		});
		this.pullStatuses();
	}

	render() {	
		return (
			<div className="UserProfile">
				<PageNavbar active="statuses" />
				<div className="container bestgenres-container">
			      <div className="jumbotron">
		            <div className="h5">{`Username: ${this.state.username}`}</div>
					<div className="h5"> Statuses </div>
					<br></br>
					<br></br>
					{this.state.statuses.map((value) => {
						if (Object.keys(value.statusImage).length === 0) {
							return <div>
                  				<p> {value.username} </p>
								<p> {value.status} </p>
								{/* <img src = {value.imageStatus}> */}
								<p> {value.time} </p>
								<br></br>
                  			</div>;
						} else {
							console.log(value.statusImage.data);
							const image = new Buffer(value.statusImage.data.data).toString("base64");
							const imageLink = "data:image/png;base64," + image;
							return <div>
                  				<p> {value.username} </p>
								{/* <p> {imageLink}</p> */}
								{/* <img src = "data:image/png;base64,{image}"/> */}
								<img src = {imageLink}/>
								{/* <img src = "https://icon-library.com/images/chat-app-icon/chat-app-icon-0.jpg"></img> */}
								<p> {value.time} </p>
								<br></br>
                  			</div>;
						}
              		})}
			      </div>
			    </div>
			</div>
		);
	}
}



