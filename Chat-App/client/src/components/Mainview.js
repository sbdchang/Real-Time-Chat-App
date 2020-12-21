import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import axios from 'axios';
import { urlToUse } from "./url";
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import { ReactMic } from 'react-mic';
import './Mainview.css';

export default class Mainview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
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
            contacts: [],
            num: [],
            page: [],
            curr: 1,
            selected: 0,
            addRecselected: 0,
            addRecbtn: ["Select", "Add"],
            atCondition: 0
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
        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.setPreviousPage = this.setPreviousPage.bind(this);
        this.setNextPage = this.setNextPage.bind(this);
        this.selectRecContact = this.selectRecContact.bind(this);
        this.addRecContact = this.addRecContact.bind(this);
        this.atMessage = this.atMessage.bind(this);
        this.atSelect = this.atSelect.bind(this);
    }

    pullContacts() {
        axios.get(`${urlToUse.url.API_URL}/users`)
            .then(res => {
                const users = res.data;
                var validUsers = [];
                var validContacts = [];
                for (var i = 0; i < users.length; i++) {
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
        await this.pullContacts();
        await axios.post(`${urlToUse.url.API_URL}/message/deliver?receiver=${this.state.username}`);
        for (var i = 0; i < this.state.contacts.length; i++) {
            for (var j = 0; j < this.state.users.length; j++) {
                if (this.state.contacts[i].username === this.state.users[j].username) {
                    await fetch(`${urlToUse.url.API_URL}/message?sender=${this.state.users[j].username}&receiver=${this.state.username}`, {
                        method: "GET",
                    }).then(response => response.json()).then(async (response) => {
                        var count = 0;
                        var tempNum = this.state.num;
                        const messages = response;
                        for (var k = 0; k < messages.length; k++) {
                            if ((messages[k].receipt === 0 || messages[k].receipt === 1) && messages[k].sender !== this.state.username) {
                                count = count + 1;
                            }
                        }
                        tempNum.push(count);
                        await this.setState({ num: tempNum });
                    })
                }
            }
        }
        window.setInterval(async () => {
            const data = await fetch(`${urlToUse.url.API_URL}/getting_video_chat?callee=${this.state.username}`, {
                method: 'GET'
            }).then((res) => {
                return res.json();
            });
            if (data.caller !== "") {
                let result = window.confirm(`${data.caller} is calling you. Would you like to answer?`);
                if (result) {
                    const url = `${document.location.origin}/videochat?room_name=${data.caller}${this.state.username}&user_name=${this.state.username}`;
                    window.location.replace(url);
                } else {
                    await fetch(`${urlToUse.url.API_URL}/videochat`, {
                        method: 'POST',
                        body: JSON.stringify({
                            callee: this.state.username,
                            caller: ""
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
            }
        }, 3000);

    }

    async contactOpen(user, email) {
        this.setState({ currentUser: user, showModal: true, currentUserEmail: email, image: "", audio: "", video: "" });
        await axios.get(`${urlToUse.url.API_URL}/message?sender=${user}&receiver=${this.state.username}`)
            .then(res => {
                this.setState({ messages: res.data });
                var tempPage = [];
                const messages = res.data;
                for (var i = 0; 5 * i < messages.length; i++) {
                    tempPage.push(i + 1);
                }
                this.setState({ page: tempPage });
            });
        await axios.post(`${urlToUse.url.API_URL}/message/read?sender=${user}&receiver=${this.state.username}`);
        for (var j = 0; j < this.state.contacts.length; j++) {
            console.log(this.state.contacts[j].username);
            if (this.state.contacts[j].username === user) {
                var temp = this.state.num;
                temp[j] = 0;
                await this.setState({ num: temp });
            }
        }
    }

    hideModal() {
        this.setState({ showModal: false });
    }

    searchContact(e) {
        if (e.target.value === "") {
            this.setState({ users: this.state.usersCopy });
        } else {
            var searchedUsers = []
            for (var i = 0; i < this.state.usersCopy.length; i++) {
                if (this.state.usersCopy[i].username.includes(e.target.value) || this.state.usersCopy[i].email.includes(e.target.value)) {
                    if (this.state.usersCopy[i].username !== this.state.username) {
                        searchedUsers.push(this.state.usersCopy[i]);
                    }
                }
            }
            for (var j = 0; j < this.state.users.length; j++) {
                if (document.getElementById(`add${j}`)) {
                    document.getElementById(`add${j}`).checked = false;
                }
            }
            this.setState({ users: searchedUsers });
        }
    }

    atMessage() {
        var msent = document.getElementById("msent").value;
        if (msent.split("")[msent.length - 1] == "@") {
            this.setState({ atCondition: 1 });
        }
        else {
            this.setState({ atCondition: 0 });
        }
    }

    atSelect() {
        var msent = document.getElementById("msent").value;
        var select = document.getElementById("atSelectId").value;
        document.getElementById("msent").value = msent + select

    }

    async sendMessage() {
        const msent = document.getElementById("msent").value;
        await fetch(`${urlToUse.url.API_URL}/message/text?sender=${this.state.username}&receiver=${this.state.currentUser}&text=${msent}`, {
            method: "POST",
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((response) => {
                    if (this.state.messages.length % 5 === 0) {
                        var tempPage = this.state.page;
                        const newPage = this.state.messages.length / 5 + 1;
                        tempPage.push(newPage);
                        this.setState({ page: tempPage });
                    }
                    var temp = this.state.messages;
                    temp.push(response);
                    this.setState({ messages: temp });
                    // maggie
                    var select = document.getElementById("atSelectId").value;
                    //document.getElementById("atLink").innerHTML = "Userprofile: " + select.link("http://localhost:3000/userprofile?username=" + select)
                    document.getElementById("atLink").innerHTML = "Userprofile: " + select.link("http://chat-app-557-client.herokuapp.com/userprofile?username=" + select)
                });
                fetch(`${urlToUse.url.API_URL}/users/shuffle?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                    method: "POST",
                });
            }
        });
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
                        if (this.state.messages.length % 5 === 0) {
                            var tempPage = this.state.page;
                            const newPage = this.state.messages.length / 5 + 1;
                            tempPage.push(newPage);
                            this.setState({ page: tempPage });
                        }
                        var temp = this.state.messages;
                        temp.push(response);
                        this.setState({ messages: temp });
                    });
                    fetch(`${urlToUse.url.API_URL}/users/shuffle?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                        method: "POST",
                    });
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
            console.log(audio);
            formData.append("audio", audio);
            await fetch(`${urlToUse.url.API_URL}/message/audio?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                method: "POST",
                body: formData
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((response) => {
                        if (this.state.messages.length % 5 === 0) {
                            var tempPage = this.state.page;
                            const newPage = this.state.messages.length / 5 + 1;
                            tempPage.push(newPage);
                            this.setState({ page: tempPage });
                        }
                        var temp = this.state.messages;
                        temp.push(response);
                        this.setState({ messages: temp });
                    });
                    fetch(`${urlToUse.url.API_URL}/users/shuffle?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                        method: "POST",
                    });
                } else if (response.status === 400) {
                    this.setState({ audio: "Failure: Your Audio is too Large!" });
                }
            })
        }
    }

    sendAudioFile = async (audio) => {
        let formData = new FormData();
        formData.append("audio", audio);
        await fetch(`${urlToUse.url.API_URL}/message/audio1?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
            method: "POST",
            body: formData
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((response) => {
                    if (this.state.messages.length % 5 === 0) {
                        var tempPage = this.state.page;
                        const newPage = this.state.messages.length / 5 + 1;
                        tempPage.push(newPage);
                        this.setState({ page: tempPage });
                    }
                    var temp = this.state.messages;
                    temp.push(response);
                    this.setState({ messages: temp });
                });
                fetch(`${urlToUse.url.API_URL}/users/shuffle?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                    method: "POST",
                });
            } else if (response.status === 400) {
                this.setState({ audio: "Failure: Your Audio is too Large!" });
            }
        })
    }

    sendVideo = async (event) => {
        const file = event.target.files;
        if (file && file[0]) {
            const video = file[0];
            let formData = new FormData
            formData.append("video", video);
            await fetch(`${urlToUse.url.API_URL}/message/video?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                method: "POST",
                body: formData
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((response) => {
                        if (this.state.messages.length % 5 === 0) {
                            var tempPage = this.state.page;
                            const newPage = this.state.messages.length / 5 + 1;
                            tempPage.push(newPage);
                            this.setState({ page: tempPage });
                        }
                        var temp = this.state.messages;
                        temp.push(response);
                        this.setState({ messages: temp });
                    });
                    fetch(`${urlToUse.url.API_URL}/users/shuffle?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                        method: "POST",
                    });
                } else if (response.status === 400) {
                    this.setState({ video: "Failure: Your Video is too Large!" });
                }
            })
        }
    }

    selectMessage() {
        if (this.state.selected === 0 && this.state.messages.length > 0) {
            this.setState({ selected: 1, msgbtn: ["Cancel", "Delete"] });
        } else {
            this.setState({ selected: 0, msgbtn: ["Select", "Delete All"] });
        }
    }

    async deleteMessage() {
        // WARNING: You are about to delete all messages. Click again to proceed.
        if (this.state.selected === 0) {
            fetch(`${urlToUse.url.API_URL}/message/deleteall?sender=${this.state.username}&receiver=${this.state.currentUser}`, {
                method: "POST",
            }).then((data) => {
                this.setState({ messages: [], page: [] });
            })
        } else {
            var i = this.state.messages.length - (this.state.curr - 1) * 5 - 1;
            var l = Math.max(this.state.messages.length - this.state.curr * 5, 0) - 1;
            while (i !== l) {
                if (document.getElementById(`check${i}`)) {
                    if (document.getElementById(`check${i}`).checked === true) {
                        await axios.post(`${urlToUse.url.API_URL}/message/delete?index=${this.state.messages[i].index}`);
                        if ((this.state.messages.length - 1) % 5 === 0) {
                            var tempPage = this.state.page;
                            tempPage.pop();
                            this.setState({ page: tempPage });
                            if (this.state.curr > 1) {
                                var tempCurr = this.state.curr;
                                this.setState({ curr: tempCurr - 1 });
                            }
                        }
                        var temp = this.state.messages;
                        temp.splice(i, 1);
                        this.setState({ messages: temp });
                    }
                }
                i = i - 1;
            }
            for (var j = 0; j < this.state.messages.length; j++) {
                if (document.getElementById(`check${j}`)) {
                    document.getElementById(`check${j}`).checked = false;
                }
            }
        }
    }

    async videoCall() {
        await fetch(`${urlToUse.url.API_URL}/videochat`, {
            method: 'POST',
            body: JSON.stringify({
                callee: this.state.currentUser,
                caller: this.state.username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.status);
            if (response.status == 201) {
                alert(`${this.state.currentUser} isn't online right now!`);
                return
            }
            window.setTimeout(async () => {
                const data = await fetch(`${urlToUse.url.API_URL}/getting_video_chat?callee=${this.state.currentUser}`, {
                    method: 'GET'
                }).then((res) => {
                    return res.json();
                });
                if (data.caller === "") {
                    alert(`${this.state.currentUser} doesn't want to talk right now!`);
                }
            }, 3000);
            const url = `${document.location.origin}/videochat?room_name=${this.state.username}${this.state.currentUser}&user_name=${this.state.username}`
            window.location.replace(url);
        })
    }

    selectContact() {
        if (this.state.addselected === 0) {
            this.setState({ addselected: 1, addbtn: ["Cancel", "Add"] });
        } else {
            this.setState({ addselected: 0, addbtn: ["Select", "Add"] });
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
                        this.setState({ contacts: temp });
                        axios.post(`${urlToUse.url.API_URL}/users/add?username=${this.state.username}&contact=${this.state.users[i].username}`);
                    }
                }
            }
            for (var k = 0; k < this.state.users.length; k++) {
                document.getElementById(`add${k}`).checked = false;
            }
        }
    }

    selectRecContact() {
        if (this.state.addRecselected === 0) {
            this.setState({ addRecselected: 1, addRecbtn: ["Cancel", "Add"] });
        } else {
            this.setState({ addRecselected: 0, addRecbtn: ["Select", "Add"] });
        }
    }

    addRecContact() {
        if (this.state.addRecselected === 1) {

            for (var i = 0; i < this.state.users.length; i++) {
                if (document.getElementById(`addRec${i}`) != null) {
                    if (document.getElementById(`addRec${i}`).checked === true) {
                        var inContacts = 0;
                        for (var j = 0; j < this.state.contacts.length; j++) {
                            if (this.state.contacts[j].username === this.state.users[i].username) {
                                inContacts = 1;
                            }
                        }
                        if (inContacts === 0) {
                            var temp = this.state.contacts;
                            temp.push(this.state.users[i]);
                            this.setState({ contacts: temp });
                            axios.post(`${urlToUse.url.API_URL}/users/addRec?username=${this.state.username}&contact=${this.state.users[i].username}`);
                        }
                    }
                }
            }
            for (var k = 0; k < this.state.users.length; k++) {
                if (document.getElementById(`addRec${i}`) != null) {
                    document.getElementById(`addRec${k}`).checked = false;
                }
            }
        }
    }

    selectMyContact() {
        if (this.state.removeselected === 0 && this.state.contacts.length !== 0) {
            this.setState({ removeselected: 1, removebtn: ["Cancel", "Remove"] });
        } else if (this.state.removeselected === 1) {
            this.setState({ removeselected: 0, removebtn: ["Select", "Remove"] });
        }
    }

    async removeContact() {
        if (this.state.removeselected === 1) {
            var i = 0;
            var j = 0;
            var l = this.state.contacts.length;
            var removedContacts = [];
            while (i !== l) {
                if (document.getElementById(`remove${i}`).checked === true) {
                    removedContacts.push(this.state.contacts[j]);
                    var temp = this.state.contacts;
                    temp.splice(j, 1);
                    this.setState({ contacts: temp });
                    j = j - 1;
                }
                i = i + 1;
                j = j + 1;
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


    setCurrentPage(value) {
        this.setState({ curr: value });
    }

    setPreviousPage() {
        if (this.state.curr > 1) {
            const temp = this.state.curr - 1;
            this.setState({ curr: temp });
        }
    }

    setNextPage() {
        if (this.state.curr < this.state.page.length) {
            const temp = this.state.curr + 1;
            this.setState({ curr: temp });
        }
    }

    async logout_one() {
        await fetch(`${urlToUse.url.API_URL}/logout_one`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.replace(document.location.origin);
    }


    startRecording = () => {
        this.setState({ record: true });
    }

    stopRecording = () => {
        this.setState({ record: false });
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
        // var file = new File([recordedBlob], "new_audio.mp3");
        // window.URL.createObjectURL(recordedBlob);
        // const file = new File([recordedBlob], 'new_audio.mp3', { type: recordedBlob.type })
        // console.log(file);
        this.sendAudioFile(recordedBlob);
        // var blobUrl = window.URL.createObjectURL(recordedBlob);
        // console.log(blobUrl);
    }

    render() {
        return (
            <div className="Mainview">
                <PageNavbar active="mainview" />
                <br></br>
                <div className="container">
                    <div className="jumbotron">
                        <button onClick={() => this.logout_one()} className="user1">Logout</button>
                        <div className="h5">My Contacts<button id="removeselectbtn" className="btn" onClick={this.selectMyContact}>{this.state.removebtn[0]}</button>
                            <button id="removebtn" className="btn" onClick={this.removeContact}>{this.state.removebtn[1]}</button> </div>
                        {this.state.contacts.map((value, index) => {
                            // console.log(this.state.num[index]);
                            if (this.state.removeselected === 0 && this.state.num[index] === 0) {
                                return <div>
                                    <button onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                                    <p> No New Messages</p>
                                </div>;
                            } else if (this.state.removeselected === 0 && this.state.num[index] === 1) {
                                return <div>
                                    <button onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                                    <p style={{ color: "red", }}> A New Message!</p>
                                </div>;
                            } else if (this.state.removeselected === 0 && this.state.num[index] > 1) {
                                return <div>
                                    <button onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                                    <p style={{ color: "red", }}> {this.state.num[index]} New Messages!</p>
                                </div>;
                            } else if (this.state.removeselected === 1 && this.state.num[index] === 0) {
                                const removeid = `remove${index}`;
                                return <div>
                                    <input type="checkbox" id={removeid} />
                                    <b> {value.username} - {value.email}</b>
                                    <p> No New Messages</p>
                                </div>;
                            } else if (this.state.removeselected === 1 && this.state.num[index] === 1) {
                                const removeid = `remove${index}`;
                                return <div>
                                    <input type="checkbox" id={removeid} />
                                    <b> {value.username} - {value.email}</b>
                                    <p style={{ color: "red", }}> A New Message!</p>
                                </div>;
                            } else if (this.state.removeselected === 1 && this.state.num[index] > 1) {
                                const removeid = `remove${index}`;
                                return <div>
                                    <input type="checkbox" id={removeid} />
                                    <b> {value.username} - {value.email}</b>
                                    <p style={{ color: "red", }}> {this.state.num[index]} New Messages!</p>
                                </div>;
                            } else if (this.state.removeselected === 0) {
                                return <div>
                                    <button onClick={() => this.contactOpen(value.username, value.email)} className="user1">{value.username} - {value.email}</button>
                                    <p> No New Messages</p>
                                </div>;
                            } else if (this.state.removeselected === 1) {
                                const removeid = `remove${index}`;
                                return <div>
                                    <input type="checkbox" id={removeid} />
                                    <b> {value.username} - {value.email}</b>
                                    <p> No New Messages</p>
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
                                    if (index >= this.state.messages.length - this.state.curr * 5 && index < this.state.messages.length - (this.state.curr - 1) * 5) {
                                        if (!(_.isEmpty(value.text))) {
                                            if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 0) {
                                                return <div> Sent: {value.text} </div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 1) {
                                                return <div> Delivered: {value.text} </div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 2) {
                                                return <div> Read: {value.text} </div>;
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
                                            if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 0) {
                                                return <div> Sent: <img src={imageLink} /> </div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 1) {
                                                return <div> Delivered: <img src={imageLink} /> </div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 2) {
                                                return <div> Read: <img src={imageLink} /> </div>;
                                            } else if (value.sender !== this.state.username && this.state.selected === 0) {
                                                return <div> Received: <img src={imageLink} /> </div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 1) {
                                                const checkid = `check${index}`;
                                                return <div> <input type="checkbox" id={checkid} /> Sent: <img src={imageLink} /> </div>;
                                            } else if (value.sender !== this.state.username && this.state.selected === 1) {
                                                const checkid = `check${index}`;
                                                return <div> <input type="checkbox" id={checkid} /> Received: <img src={imageLink} /> </div>;
                                            }
                                        } else if (!(_.isEmpty(value.audio))) {
                                            const audio = new Buffer(value.audio.data.data).toString("base64");
                                            const audioLink = "data:audio/mp3;base64," + audio;
                                            if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 0) {
                                                return <div>Sent: <audio controls>
                                                    <source src={audioLink} />
                                                </audio></div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 1) {
                                                return <div>Delivered: <audio controls>
                                                    <source src={audioLink} />
                                                </audio></div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 2) {
                                                return <div>Read: <audio controls>
                                                    <source src={audioLink} />
                                                </audio></div>;
                                            } else if (value.sender !== this.state.username && this.state.selected === 0) {
                                                return <div>Received: <audio controls>
                                                    <source src={audioLink} />
                                                </audio></div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 1) {
                                                const checkid = `check${index}`;
                                                return <div> <input type="checkbox" id={checkid} />
                        Sent: <audio controls>
                                                        <source src={audioLink} />
                                                    </audio> </div>;
                                            } else if (value.sender !== this.state.username && this.state.selected === 1) {
                                                const checkid = `check${index}`;
                                                return <div> <input type="checkbox" id={checkid} />
                        Received: <audio controls>
                                                        <source src={audioLink} />
                                                    </audio> </div>;
                                            }
                                        } else if (!(_.isEmpty(value.video))) {
                                            const video = new Buffer(value.video.data.data).toString("base64");
                                            const videoLink = "data:video/mp4;base64," + video;
                                            if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 0) {
                                                return <div> Sent: <video width="200" height="160" controls>
                                                    <source src={videoLink} />
                                                </video></div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 1) {
                                                return <div> Delivered: <video width="200" height="160" controls>
                                                    <source src={videoLink} />
                                                </video></div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 0 && value.receipt === 2) {
                                                return <div> Read: <video width="200" height="160" controls>
                                                    <source src={videoLink} />
                                                </video></div>;
                                            } else if (value.sender !== this.state.username && this.state.selected === 0) {
                                                return <div> Received: <video width="200" height="160" controls>
                                                    <source src={videoLink} />
                                                </video></div>;
                                            } else if (value.sender === this.state.username && this.state.selected === 1) {
                                                const checkid = `check${index}`;
                                                return <div> <input type="checkbox" id={checkid} />
                        Sent: <video width="200" height="160" controls>
                                                        <source src={videoLink} />
                                                    </video> </div>;
                                            } else if (value.sender !== this.state.username && this.state.selected === 1) {
                                                const checkid = `check${index}`;
                                                return <div> <input type="checkbox" id={checkid} />
                        Received: <video width="200" height="160" controls>
                                                        <source src={videoLink} />
                                                    </video> </div>;
                                            }
                                        }
                                    }
                                })}
                                <div class="pagination">
                                    <button onClick={this.setPreviousPage}>&laquo;</button>
                                    {this.state.page.map((value, index) => {
                                        if (value === this.state.curr) {
                                            return <div class="pagination">
                                                <button style={{ color: "red" }}>{value}</button>
                                            </div>;
                                        } else {
                                            return <div class="pagination">
                                                <button onClick={() => this.setCurrentPage(value)}>{value}</button>
                                            </div>;
                                        }
                                    })}
                                    <button onClick={this.setNextPage}>&raquo;</button>
                                </div>
                            </Modal.Body>
                            <Modal.Body>
                                <text id="atLink" />
                                <input type='text' id="msent" size="48" onChange={this.atMessage} />
                                <select id='atSelectId' onChange={this.atSelect}>
                                    {this.state.users.map((value) => {
                                        if (this.state.atCondition === 1) {
                                            return <option>{value.username}</option>
                                        } else {
                                            return <dev></dev>
                                        }
                                    })}
                                </select>

                                <button id="sendbtn" className="btn" onClick={this.sendMessage}>Send</button>
                                <p>Send Image: <input type="file" onChange={this.sendImage} className="filetype" id="image_inpt" /> {this.state.image}</p>
                                <p>Send Audio: <input type="file" onChange={this.sendAudio} className="filetype" id="audio_inpt" /> {this.state.audio}</p>
                                <p>Send Video: <input type="file" onChange={this.sendVideo} className="filetype" id="video_inpt" /> {this.state.video}</p>
                                <p style={{ width: "20px" }}>
                                    <ReactMic
                                        style={{ width: "20px" }}
                                        record={this.state.record}
                                        className="sound-wave"
                                        onStop={this.onStop.bind(this)}
                                        onData={this.onData}
                                        strokeColor="#000000"
                                        mimeType="audio/mp3"
                                        backgroundColor="#FF4081" />
                                    <button onClick={this.startRecording} type="button">Start</button>
                                    <button onClick={this.stopRecording} type="button">Send</button>
                                </p>
                                <button id="sendbtn2" onClick={this.videoCall.bind(this)}>Video call: {this.state.currentUser}</button>
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
                            <input type='text' placeholder="Search Contacts" id="sc" className="inpt" onChange={this.searchContact} />
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
                    <div className="jumbotron">
                        <div className="h5">Recommended Contacts<button id="addRecselectbtn" className="btn" onClick={this.selectRecContact}>{this.state.addRecbtn[0]}</button>
                            <button id="addRecbtn" className="btn" onClick={this.addRecContact}>{this.state.addRecbtn[1]}</button> </div>
                        {this.state.users.map((value, index) => {
                            if (this.state.addRecselected === 0 && !this.state.contacts.includes(value)) {
                                return <div>
                                    <b> {value.username} - {value.email}</b>
                                    <br></br>
                                </div>;
                            } else {
                                if (!this.state.contacts.includes(value)) {
                                    const addRecid = `addRec${index}`;
                                    return <div>
                                        <input type="checkbox" id={addRecid} />
                                        <b> {value.username} - {value.email}</b>
                                        <br></br>
                                    </div>;
                                }
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
