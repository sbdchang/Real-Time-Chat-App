import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import {urlToUse} from "./url";
import { Modal } from 'react-bootstrap';

export default class Mainview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], showModal: false, currentUser: "", currentUserEmail: "", usersCopy: []};

    this.contactOpen = this.contactOpen.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.searchContact = this.searchContact.bind(this);
  }

  pullContacts() {
    axios.get(`${urlToUse.url.API_URL}/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users: users, usersCopy: users });
      })
  }

  // React function that is called when the page load.
  componentDidMount() {
    this.pullContacts();
  }

  contactOpen(user, email) {
    this.setState({ currentUser: user, showModal: true, currentUserEmail: email });
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  searchContact(e) {
    if (e.target.value == "") {
      this.setState({ users: this.state.usersCopy });
    } else {
      var searchedUsers = []
      for(var i = 0; i < this.state.usersCopy.length; i++) {
        if (this.state.usersCopy[i].username.includes(e.target.value) || this.state.usersCopy[i].email.includes(e.target.value)) {
          searchedUsers.push(this.state.usersCopy[i]);
        }
      }
      this.setState({ users: searchedUsers });
    }
  }

  render() {
    return (
      <div className="Mainview">

        <PageNavbar active="mainview" />

        <br></br>
        <div className="container">
          <div className="jumbotron">
            <div className="h5">Contacts</div>
              {this.state.users.map((value, index) => {
                return <div><button  onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button> <br /><br /></div>;
              })}
              <Modal show={this.state.showModal} onHide={() => this.hideModal()} >
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.currentUser}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.state.currentUserEmail}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <input type='text' placeholder="Contact" id="sc" className="sc-input" onChange={this.searchContact}/>
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
