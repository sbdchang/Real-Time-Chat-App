import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import {urlToUse} from "./url";
import { Modal } from 'react-bootstrap';
import GenreButton from './GenreButton';
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
      msgbtn: ["Select", "Delete All"],
      addbtn: ["Select", "Add"],
      removebtn: ["Select", "Remove"],
      selected: 0,
      addselected: 0,
      removeselected: 0,
      contacts: []
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
    this.selectContact = this.selectContact.bind(this);
    this.addContact = this.addContact.bind(this);
    this.selectMyContact = this.selectMyContact.bind(this);
    this.removeContact = this.removeContact.bind(this);
  }

  pullContacts() {
    axios.get(`${urlToUse.url.API_URL}/users`)
      .then(res => {
        const users = res.data;
        var validUsers = [];
        var validContacts = [];
        for(var i = 0; i < users.length; i++) {
          if (users[i].username !== this.state.username && users[i].activeRecord === 0) {
            validUsers.push(users[i]);
          } else if (users[i].username === this.state.username) {
            for (var j = 0; j < users[i].contacts.length; j++) {
              for (var k = 0; k < users.length; k++) {
                if (users[k].username === users[i].contacts[j] && users[k].activeRecord === 0) {
                  validContacts.push(users[k]);
                }
              }
            }
          }
        }
        this.setState({ users: validUsers, usersCopy: validUsers, contacts: validContacts });
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
      for (var j = 0; j < this.state.users.length; j++) {
        document.getElementById(`add${j}`).checked = false;
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
			}).then((response) => {
        if (response.status === 200) {
          response.json().then((response) => {
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

  selectMessage() {
    if (this.state.selected === 0) {
      this.setState({selected: 1, msgbtn: ["Cancel", "Delete"]});
    } else {
      this.setState({selected: 0, msgbtn: ["Select", "Delete All"]});
    }
  }

  deleteMessage() {
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

  selectContact() {
    if (this.state.addselected === 0) {
      this.setState({addselected: 1, addbtn: ["Cancel", "Add"]});
    } else {
      this.setState({addselected: 0, addbtn: ["Select", "Add"]});
      // for (var i = 0; i < this.state.users.length; i++) {
      //   document.getElementById(`add${i}`).checked = false;
      // }
    }
  }

  addContact() {
    if (this.state.addselected === 1) {
      for (var i = 0; i < this.state.users.length; i++) {
        if (document.getElementById(`add${i}`).checked === true) {
          var inContacts = 0;
          for (var j = 0; j < this.state.contacts.length; j++) {
            if (this.state.contacts[j].username === this.state.users[i].username) {
              inContacts = 1;
            }
          }
          if (inContacts === 0) {
            var temp = this.state.contacts;
            temp.push(this.state.users[i]);
            this.setState({contacts: temp});
            axios.post(`${urlToUse.url.API_URL}/users/add?username=${this.state.username}&contact=${this.state.users[i].username}`);
          }
        }
      }
      for (var k = 0; k < this.state.users.length; k++) {
        document.getElementById(`add${k}`).checked = false;
      }
    }
  }

  selectMyContact() {
    if (this.state.removeselected === 0 && this.state.contacts.length !== 0) {
      this.setState({removeselected: 1, removebtn: ["Cancel", "Remove"]});
    } else if (this.state.removeselected === 1) {
      this.setState({removeselected: 0, removebtn: ["Select", "Remove"]});
    }
  }

  async removeContact() {
    if (this.state.removeselected === 1) {
      var i = 0;
      var j = 0;
      var l = this.state.contacts.length;
      const removedContacts = [];
      while (i !== l) {
        if (document.getElementById(`remove${i}`).checked === true) {
          removedContacts.push(this.state.contacts[j]);
          var temp = this.state.contacts;
          temp.splice(j, 1);
          this.setState({contacts: temp});
          j = j-1;
        }
        i = i+1;
        j = j+1;
      }
      for (var k = 0; k < this.state.contacts.length; k++) {
        document.getElementById(`remove${k}`).checked = false;
      }
      for (var m = 0; m < removedContacts.length; m++) {
        await fetch(`${urlToUse.url.API_URL}/users/remove?username=${this.state.username}&contact=${removedContacts[m].username}`, {
          method: "POST",
        });
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
            <div className="h5">My Contacts <button id="removeselectbtn" className="btn" onClick={this.selectMyContact}>{this.state.removebtn[0]}</button>
            <button id="removebtn" className="btn" onClick={this.removeContact}>{this.state.removebtn[1]}</button> </div>
            {this.state.contacts.map((value, index) => {
              if (this.state.removeselected === 0) {
                return <div>
                  <button  onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                  <br></br>
                  </div>;
              } else {
                const removeid = `remove${index}`;
                return <div>
                  <input type="checkbox" id={removeid} />
                  <b> {value.username} - {value.email}</b>
                  <br></br>
                  </div>;
              }
              })}
              <Modal show={this.state.showModal} onHide={() => this.hideModal()} >
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.currentUser} ({this.state.currentUserEmail})</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <b>Messages: </b> <button id="selectbtn" className="btn" onClick={this.selectMessage}>{this.state.msgbtn[0]}</button>
            <button id="deletebtn" className="btn" onClick={this.deleteMessage}>{this.state.msgbtn[1]}</button>
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
            <div className="h5">All Contacts<button id="addselectbtn" className="btn" onClick={this.selectContact}>{this.state.addbtn[0]}</button>
            <button id="addbtn" className="btn" onClick={this.addContact}>{this.state.addbtn[1]}</button> </div>
            <div>
              <input type='text' placeholder="Search Contacts" id="sc" className="inpt" onChange={this.searchContact}/>
            </div>
            {this.state.users.map((value, index) => {
              if (this.state.addselected === 0) {
                return <div>
                  <b> {value.username} - {value.email}</b>
                  <br></br>
                  </div>;
              } else {
                const addid = `add${index}`;
                return <div>
                  <input type="checkbox" id={addid} />
                  <b> {value.username} - {value.email}</b>
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
