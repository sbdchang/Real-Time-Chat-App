import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class Mainview extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: []
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres", {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json()) // Convert the response data to a JSON.
      .then(genreList => {
        if (!genreList) return;
        // Map each genreObj in genreList to an HTML element:
        // A button which triggers the showMovies function for each genre.
        let genreDivs = genreList.map((genreObj, i) =>
          <GenreButton id={"button-" + genreObj.genre} onClick={() => this.showMovies(genreObj.genre)} genre={genreObj.genre} />
        );

        // Set the state of the genres list to the value returned by the HTTP response from the server.
        this.setState({
          genres: genreDivs
        })
      })
      .catch(err => console.log(err))	// Print the error if there is one.
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    fetch("http://localhost:8081/genres/" + genre, {
      method: 'GET' // The type of HTTP request.
    })
      .then(res => res.json())
      .then(moviesList => {
        if (!moviesList) return;

        let moviesDivs = moviesList.map((movie, i) => (
          <DashboardMovieRow title = {movie.title} rating = {movie.rating} votes = {movie.votes}/>
                          
        ));

        this.setState({
          movies: moviesDivs
        })
      })
      .catch(err => console.log(err)); // Print the error if there is one.
  }

  render() {    
    return (
      <div className="Mainview">

        <PageNavbar active="mainview" />

        <br></br>
        <div className="container">
          <div className="jumbotron">
            <div className="h5">Contacts</div>
            <button id="user1" className="user1">User 1</button>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <button id="search" className="search">Search Contact</button>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}