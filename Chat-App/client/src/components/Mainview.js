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
      image: "",
      audio: "",
      video: "",
      messages: [],
    };
    this.contactOpen = this.contactOpen.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.searchContact = this.searchContact.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendImage = this.sendImage.bind(this);
    this.sendAudio = this.sendAudio.bind(this);
    this.sendVideo = this.sendVideo.bind(this);
  }

  pullContacts() {
    axios.get(`${urlToUse.url.API_URL}/users`)
      .then(res => {
        const users = res.data;
        var validUsers = [];
        for(var i = 0; i < users.length; i++) {
          if (users[i].username !== this.state.username && users[i].activeRecord === 0) {
            validUsers.push(users[i]);
          }
        }
        this.setState({ users: validUsers, usersCopy: validUsers });
      })
  }

  async componentDidMount() {
    this.setState({
			username: await window.location.href.split('=').pop()
		});
    this.pullContacts();
  }

  contactOpen(user, email) {
    this.setState({ currentUser: user, showModal: true, currentUserEmail: email });
    axios.get(`${urlToUse.url.API_URL}/message?sender=${user}&receiver=${this.state.username}`)
		  .then(res => {
			this.setState({ messages: res.data })
		  })
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

  async sendMessage() {
    const msent = document.getElementById("msent").value;
		await fetch(`${urlToUse.url.API_URL}/message/text?sender=${this.state.username}&receiver=${this.state.currentUser}&text=${msent}`, {
      method: "POST"
    });
    var temp = this.state.messages;
    temp.push({sender: this.state.username, receiver: this.state.currentUser, text: msent,
      image: null, audio: null, video: null});
    this.setState({messages: temp});
  }

  sendImage = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      const image = file[0];
			let formData = new FormData();
      formData.append("image", image);
      fetch(`${urlToUse.url.API_URL}/message/image?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
				body: formData
			}).then((data) => {
        if (data.status === 200) {
          this.setState({ image: "Success: Image Sent!" });
        } else if (data.status === 400) {
          this.setState({ image: "Failure: Image too Large!" });
        }
      })
    }
  }

  sendAudio = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      const audio = file[0];
			let formData = new FormData();
      formData.append("audio", audio);
      fetch(`${urlToUse.url.API_URL}/message/audio?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
				body: formData
			}).then((data) => {
        if (data.status === 200) {
          this.setState({ image: "Success: Audio Sent!" });
        } else if (data.status === 400) {
          this.setState({ image: "Failure: Audio too Large!" });
        }
      })
    }
  }

  sendVideo = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      const video = file[0];
			let formData = new FormData();
      formData.append("video", video);
      fetch(`${urlToUse.url.API_URL}/message/video?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
				body: formData
			}).then((data) => {
        if (data.status === 200) {
          this.setState({ image: "Success: Video Sent!" });
        } else if (data.status === 400) {
          this.setState({ image: "Failure: Video too Large!" });
        }
      })
    }   
  }

  render() {
    return (
      <div className="Mainview">
        <PageNavbar active="mainview" />
        <br></br>
        <div className="container">
          <div className="jumbotron">
            <div className="h5">Contact List</div>

              {this.state.users.map((value) => {
                return <div>
                  <button  onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                  </div>;
              })}
              <Modal show={this.state.showModal} onHide={() => this.hideModal()} >
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.currentUser} ({this.state.currentUserEmail})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <b>Messages: </b>
                {this.state.messages.map(value => {
                  if (Object.keys(value.text).length !== 0) {
                    if (value.sender === this.state.username) {
                      return <div> Sent: {value.text} </div>;
                    } else {
                      return <div> Received: {value.text} </div>;
                    }
                  } else if (Object.keys(value.image).length !== 0) {
                    const image = new Buffer(value.image.data.data).toString("base64");
                    const imageLink = "data:image/png;base64," + image;
                    if (value.sender === this.state.username) {
                      return <div>
                      Sent: <img src = {imageLink}/>
                      </div>;
                    } else {
                      return <div>
                      Received: <img src = {imageLink}/>
                      </div>;
                    }
                  } else if (Object.keys(value.audio).length !== 0) {
                    const audio = new Buffer(value.audio.data.data).toString("base64");
                    const audioLink = "data:audio/mp3;base64," + audio;
                    if (value.sender === this.state.username) {
                      return <div>Sent: <audio controls>
                      <source src = {audioLink}/>
                      </audio></div>;
                    } else {
                      return <div>Received: <audio controls>
                      <source src = {audioLink}/>
                      </audio></div>;
                    }
                  } else if (Object.keys(value.video).length !== 0) {
                    const video= new Buffer(value.video.data.data).toString("base64");
                    const videoLink = "data:video/mp4;base64," + video;
                    if (value.sender === this.state.username) {
                      return <div> Sent: <video width="200" height="160" controls>
                      <source src = {videoLink}/>
                      </video></div>;
                    } else {
                      return <div> Received: <video width="200" height="160" controls>
                      <source src = {videoLink}/>
                      </video></div>;
                    }
                  }
                })}
                </Modal.Body>
                <Modal.Body>
                <input type='text' id="msent" size = "48"/>
                <button id="sendbtn" className="btn" onClick={this.sendMessage}>Send</button>
                <p>Send Image: <input type="file" onChange={this.sendImage} className="filetype" id="image_inpt"/> {this.state.image}</p>
                <p>Send Audio: <input type="file" onChange={this.sendAudio} className="filetype" id="audio_inpt"/> {this.state.audio}</p>
                <p>Send Video: <input type="file" onChange={this.sendVideo} className="filetype" id="video_inpt"/> {this.state.video}</p>
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
