import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import {urlToUse} from "./url";

export default class Mainview extends React.Component {
  constructor(props) {
    super(props);
  }

  pullContacts() {
    axios.get(`${urlToUse.url.API_URL}/contacts`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  // React function that is called when the page load.
  componentDidMount() {
    this.pullContacts();
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

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
