import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';

export default class Mainview extends React.Component {
  constructor(props) {
    super(props);
  }

  // React function that is called when the page load.
  componentDidMount() {

  }

  render() {    
    return (
      <div className="Mainview">

        <PageNavbar active="mainview" />

        <br></br>
        <div className="container">
          <div className="jumbotron">
            <div className="h5">Contacts</div>
            <button id="user1" className="user1">Contact 1</button>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <input type='text' placeholder="Contact" id="sc" className="sc-input"/>
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