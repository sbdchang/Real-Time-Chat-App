import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/BestGenres.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/decades", {
      		method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json())
			.then(decadesList => {
				if (!decadesList) return;

				let decadesDivs = decadesList.map((decade, i) => (
					<option value={decade.decade} >{decade.decade}</option>
				));

				this.setState({
					decades: decadesDivs
				})
			})
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		fetch("http://localhost:8081/bestgenres/" + this.state.selectedDecade, {
      		method: 'GET' // The type of HTTP request.
		})
			.then(res => res.json())
			.then(bestGenresList => {
				if (!bestGenresList) return;

				let bestGenresDivs = bestGenresList.map((bestGenre, i) => (
					<BestGenreRow genre = {bestGenre.genre} rating = {bestGenre.rating}/>
				));

				this.setState({
					genres: bestGenresDivs
				})
			})
		.catch(err => console.log(err)); // Print the error if there is one.
	}

	render() {
		const a = "111";
		return (
			<div className="UserProfile">
				<PageNavbar active="userprofile" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Username: </div>
					<div className="h6">Registration Date:</div>
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