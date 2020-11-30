import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import {urlToUse} from "./url";
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

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
      buttons: ["Select", "Delete All"],
      selected: 0,
    };
    this.contactOpen = this.contactOpen.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.searchContact = this.searchContact.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.selectMessage = this.selectMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
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
      method: "POST",
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((response) => {
          var temp = this.state.messages;
          temp.push(response);
          this.setState({messages: temp});
        })
      }
    })
  }

  sendImage = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      const image = file[0];
			let formData = new FormData();
      formData.append("image", image);
      await fetch(`${urlToUse.url.API_URL}/message/image?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
				body: formData
			}).then((response) => {
        if (response.status === 200) {
          response.json().then((response) => {
            var temp = this.state.messages;
            temp.push(response);
            this.setState({messages: temp});
          })
        } else if (response.status === 400) {
          this.setState({ image: "Failure: Your Image is too Large!" });
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
      await fetch(`${urlToUse.url.API_URL}/message/audio?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
				body: formData
			}).then(async (response) => {
        if (response.status === 200) {
          await response.json().then((response) => {
            var temp = this.state.messages;
            temp.push(response);
            this.setState({messages: temp});
          })
        } else if (response.status === 400) {
          this.setState({ image: "Failure: Your Audio is too Large!" });
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
      await fetch(`${urlToUse.url.API_URL}/message/video?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
				body: formData
			}).then((response) => {
        if (response.status === 200) {
          response.json().then((response) => {
            var temp = this.state.messages;
            temp.push(response);
            this.setState({messages: temp});
          })
        } else if (response.status === 400) {
          this.setState({ image: "Failure: Your Video is too Large!" });
        }
      })
    }   
  }

  async selectMessage() {
    if (this.state.selected === 0) {
      this.setState({selected: 1, buttons: ["Cancel", "Delete"]});
    } else {
      this.setState({selected: 0, buttons: ["Select", "Delete All"]});
    }
  }

  async deleteMessage() {
    // WARNING: You are about to delete all messages. Click again to proceed.
    if (this.state.selected === 0) {
      fetch(`${urlToUse.url.API_URL}/message/deleteall?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
				method: "POST",
			}).then((data) => {
        this.setState({messages: []});
      })
    } else {
      var i = 0;
      var j = 0;
      var l = this.state.messages.length;
      while (i !== l) {
        if (document.getElementById(`check${i}`).checked === true) {
          axios.post(`${urlToUse.url.API_URL}/message/delete?index=${this.state.messages[j].index}`);
          var temp = this.state.messages;
          temp.splice(j, 1);
          this.setState({messages: temp});
          j = j-1;
        }
        i = i+1;
        j = j+1;
      }
      for (var k = 0; k < this.state.messages.length; k++) {
        document.getElementById(`check${k}`).checked = false;
      } 
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
                <b>Messages: </b> <button id="selectbtn" className="btn" onClick={this.selectMessage}>{this.state.buttons[0]}</button>
            <button id="deletebtn" className="btn" onClick={this.deleteMessage}>{this.state.buttons[1]}</button>
                {this.state.messages.map((value, index) => {
                  if (!(_.isEmpty(value.text))) {
                    if (value.sender === this.state.username && this.state.selected === 0) {
                      return <div> Sent: {value.text} </div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 0) {
                      return <div> Received: {value.text} </div>;
                    } else if (value.sender === this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} /> Sent: {value.text} </div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} /> Received: {value.text} </div>;
                    }
                  } else if (!(_.isEmpty(value.image))) {
                    const image = new Buffer(value.image.data.data).toString("base64");
                    const imageLink = "data:image/png;base64," + image;
                    if (value.sender === this.state.username && this.state.selected === 0) {
                      return <div> Sent: <img src = {imageLink}/> </div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 0) {
                      return <div> Received: <img src = {imageLink}/> </div>;
                    } else if (value.sender === this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} /> Sent: <img src = {imageLink}/> </div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} /> Received: <img src = {imageLink}/> </div>;
                    }
                  } else if (!(_.isEmpty(value.audio))) {
                    const audio = new Buffer(value.audio.data.data).toString("base64");
                    const audioLink = "data:audio/mp3;base64," + audio;
                    if (value.sender === this.state.username && this.state.selected === 0) {
                      return <div>Sent: <audio controls>
                      <source src = {audioLink}/>
                      </audio></div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 0) {
                      return <div>Received: <audio controls>
                      <source src = {audioLink}/>
                      </audio></div>;
                    } else if (value.sender === this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} />
                      Sent: <audio controls>
                      <source src = {audioLink}/>
                      </audio> </div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} />
                      Received: <audio controls>
                      <source src = {audioLink}/>
                      </audio> </div>;
                    }
                  } else if (!(_.isEmpty(value.video))) {
                    const video= new Buffer(value.video.data.data).toString("base64");
                    const videoLink = "data:video/mp4;base64," + video;
                    if (value.sender === this.state.username && this.state.selected === 0) {
                      return <div> Sent: <video width="200" height="160" controls>
                      <source src = {videoLink}/>
                      </video></div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 0) {
                      return <div> Received: <video width="200" height="160" controls>
                      <source src = {videoLink}/>
                      </video></div>;
                    } else if (value.sender === this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} />
                      Sent: <video width="200" height="160" controls>
                      <source src = {videoLink}/>
                      </video> </div>;
                    } else if (value.sender !== this.state.username && this.state.selected === 1) {
                      const checkid = `check${index}`;
                      return <div> <input type="checkbox" id={checkid} />
                      Received: <video width="200" height="160" controls>
                      <source src = {videoLink}/>
                      </video> </div>;
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
