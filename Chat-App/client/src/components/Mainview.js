import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import {urlToUse} from "./url";
import { Modal } from 'react-bootstrap';

export default class Mainview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      users: [],
      showModal: false,
      currentUser: "",
      currentUserEmail: "",
      usersCopy: [],
      messages: {},
      currentMessages: [],
      read: "No New Messages"
    };
    this.contactOpen = this.contactOpen.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.searchContact = this.searchContact.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendImage = this.sendImage.bind(this);
  }

  pullContacts() {
    axios.get(`${urlToUse.url.API_URL}/users`)
      .then(res => {
        const users = res.data;
        var validUsers = [];
        var map = {};
        for(var i = 0; i < users.length; i++) {
          if (users[i].username !== this.state.username) {
            validUsers.push(users[i]);
            map[users[i].username] = [];
          }
        }
        this.setState({ users: validUsers, usersCopy: users, messages: map });
      })
  }

  async componentDidMount() {
    this.setState({
			username: await window.location.href.split('=').pop()
		});
    this.pullContacts();
    axios.get(`${urlToUse.url.API_URL}/users/receive?receiver=${this.state.username}`)
      .then(res => {
        for(var i = 0; i < this.state.users.length; i++) {
          const msg = res.data[i];
          this.state.messages[this.state.users[i].username] = msg.usermsg;
          if (msg.received == 1) {
            this.setState({read: `${msg.received} New Message!`});
          } else if (msg.received > 1) {
            this.setState({read: `${msg.received} New Messages!`});
          }
        }
    });

  }

  contactOpen(user, email) {
    var userMessages = this.state.messages[user];
    this.setState({ currentUser: user, showModal: true, currentUserEmail: email, currentMessages: userMessages });
    axios.post(`${urlToUse.url.API_URL}/users/read?sender=${user}&receiver=${this.state.username}`);
  }

  hideModal() {
    this.setState({ showModal: false });
  }

  searchContact(e) {
    if (e.target.value === "") {
      this.setState({ users: this.state.usersCopy });
    } else {
      var searchedUsers = []
      for(var i = 0; i < this.state.usersCopy.length; i++) {
        if (this.state.usersCopy[i].username.includes(e.target.value) || this.state.usersCopy[i].email.includes(e.target.value)) {
          if (this.state.usersCopy[i].username !== this.state.username) {
            searchedUsers.push(this.state.usersCopy[i]);
          }
        }
      }
      this.setState({ users: searchedUsers });
    }
  }

  sendMessage() {
    var newMessages = this.state.messages[this.state.currentUser];
    console.log(this.state.messages);
    const msent = document.getElementById("msent").value;
    newMessages.push({key: msent, value: "Sent: "});
    var map = this.state.messages;
    map[this.state.currentUser] = newMessages;
    this.setState({ messages: map, currentMessages: newMessages});
    axios.post(`${urlToUse.url.API_URL}/users/send?sender=${this.state.username}&receiver=${this.state.currentUser}&msg=${msent}`);
  }

  sendImage() {
    const fsent = document.getElementById("fsent").value;
    console.log(fsent);
  }

  msgRead(m) {

  }

  render() {
    return (
      <div className="Mainview">
        <PageNavbar active="mainview" />
        <br></br>
        <div className="container">
          <div className="jumbotron">
            <div className="h5">Contacts</div>
              {this.state.users.map((value) => {
                return <div>
                  <button  onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                  <p>{this.state.read}</p>
                  </div>;
              })}
              <Modal show={this.state.showModal} onHide={() => this.hideModal()} >
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.currentUser} ({this.state.currentUserEmail})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <b>Messages: </b>
                {this.state.currentMessages.map(x => {
                return <div>
                  {x.value} {x.key}
                  </div>;
                })}
                </Modal.Body>
                <Modal.Body>
                <input type='text' placeholder="Enter your message here" id="msent" size = "48"/>
                <button id="sendbtn" className="btn" onClick={this.sendMessage}>Send</button>
                {/* <input type='image' src="/avatar.png" id="fsent" size = "48"/>
                <button id="imgbtn" className="btn" onClick={this.sendImage}>Send Image</button> */}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
          </div>
          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <input type='text' placeholder="Search Contact" id="sc" className="inpt" onChange={this.searchContact}/>
                <button id="sendbtn" className="btn" onClick={this.receiveMessage}>Get</button>
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
