import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import {urlToUse} from "./url";
import { Modal } from 'react-bootstrap';
// import $ from 'jquery';

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
      read: "No New Messages",
      image: "",
      audio: "",
      imgerror: "",
    };
    this.contactOpen = this.contactOpen.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.searchContact = this.searchContact.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendImage = this.sendImage.bind(this);
    this.sendAudio = this.sendAudio.bind(this);
    this.sendVideo = this.sendVideo.bind(this);
    this.test = this.test.bind(this);
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
          if (msg.received === 1) {
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
    const msent = document.getElementById("msent").value;
    newMessages.push({key: msent, value: "Text Sent: "});
    var map = this.state.messages;
    map[this.state.currentUser] = newMessages;
    this.setState({ messages: map, currentMessages: newMessages});
    axios.post(`${urlToUse.url.API_URL}/users/send?sender=${this.state.username}&receiver=${this.state.currentUser}&msg=${msent}&type=text`);
  }

  async test() {
    const fs = require('fs');
    const contents = fs.readFileSync('./avatar.png', {encoding: 'base64'});
    console.log(contents);
  }

  sendImage = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      this.setState({
        image: await URL.createObjectURL(file[0])
      });
    }
    var newMessages = this.state.messages[this.state.currentUser];
    // let img = new Image();
    // img.src = this.state.image;
    // img.onload = () => {
    //   console.log(img.height);
    //   // if (img.height > 160 || img.width > 160) {
    //   //   this.setState({imgerror: "Your image is too large!"});
    //   // } else {
    //   //   }
    // };
    newMessages.push({key: this.state.image, value: "Image Sent: "});
    var map = this.state.messages;
    map[this.state.currentUser] = newMessages;
    this.setState({ messages: map, currentMessages: newMessages, imgerror: ""});
    axios.post(`${urlToUse.url.API_URL}/users/send?sender=${this.state.username}&receiver=${this.state.currentUser}&msg=${this.state.image}&type=image`);    
  }

  sendAudio = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      this.setState({
        audio: await URL.createObjectURL(file[0])
      });
    }
    var newMessages = this.state.messages[this.state.currentUser];
    newMessages.push({key: this.state.audio, value: "Audio Sent: "});
    var map = this.state.messages;
    map[this.state.currentUser] = newMessages;
    this.setState({ messages: map, currentMessages: newMessages, imgerror: ""});
    axios.post(`${urlToUse.url.API_URL}/users/send?sender=${this.state.username}&receiver=${this.state.currentUser}&msg=${this.state.audio}&type=audio`);    
  }

  sendVideo = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      this.setState({
        video: await URL.createObjectURL(file[0])
      });
    }
    var newMessages = this.state.messages[this.state.currentUser];
    newMessages.push({key: this.state.video, value: "Video Sent: "});
    var map = this.state.messages;
    map[this.state.currentUser] = newMessages;
    this.setState({ messages: map, currentMessages: newMessages, imgerror: ""});
    axios.post(`${urlToUse.url.API_URL}/users/send?sender=${this.state.username}&receiver=${this.state.currentUser}&msg=${this.state.video}&type=video`);    
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
                  if (x.value[0] === "T") {
                    return <div>
                  {x.value} {x.key}
                  </div>;
                  } else if (x.value[0] === "I") {
                    return <div>{x.value} <img id="target" src={x.key.replaceAll(" ", "+")}/></div>;
                  } else if (x.value[0] === "A") {
                    return <div>{x.value} <audio controls>
                    <source src = {x.key.replaceAll(" ", "+")}/>
                    </audio></div>;
                  } else if (x.value[0] === "V") {
                    return <div>{x.value} <video width="200" height="160" controls>
                    <source src = {x.key.replaceAll(" ", "+")}/>
                    </video></div>;
                  }
                })}
                </Modal.Body>
                <Modal.Body>
                <input type='text' id="msent" size = "48"/>
                <button id="sendbtn" className="btn" onClick={this.sendMessage}>Send</button>
                <b>Send Image: </b>
                <input type="file" onChange={this.sendImage} className="filetype" id="image_inpt"/>
                <b>Send Audio: </b>
                <input type="file" onChange={this.sendAudio} className="filetype" id="audio_inpt"/>
                <b>Send Video: </b>
                <input type="file" onChange={this.sendVideo} className="filetype" id="video_inpt"/>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
              </Modal>
          </div>
          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <input type='text' placeholder="Search Contacts" id="sc" className="inpt" onChange={this.searchContact}/>
                <button id="sendbtn" className="btn" onClick={this.sendImage}>Test</button>
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
