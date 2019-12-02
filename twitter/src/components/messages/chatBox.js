import React, {useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
import logo from '../../svg/logo.svg';
import './chatBox.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Pranav from '../../svg/Pranav.jpeg';
import Kalyani from '../../svg/Kalyani.jpeg';
import Mukesh from '../../svg/Mukesh.jpeg';
import Kartik from '../../svg/Kartik.png';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';


const chatId = "11234567"
const senderId = "hdde"
const receivedId = "689d9ddd"

class MessageBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messagesList: this.props.messagesList,
    };
    //this.sendMessage = this.sendMessage.bind(this)
  }

  // sendMessage(text) {
  //     this.currentUser.sendMessage({
  //       text: text,
  //       chatId: chatId,
  //     })
  //   }


  render() {
        return (
          <div className="Messages-RightSide">
            <div className="chat-div">
              <Title />
              <MessageList messagesList={this.state.messagesList}/>
              <SendMessageForm sendMessage={this.sendMessage} />
            </div>
          </div>
        );
    }
}

class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messagesList.map((message, index) => {
                    return (
                      <li  key={message.chatId} className="message">
                        <div>{message.name}</div> {/* this was sender id*/}
                        <div>{message.text}</div>
                      </li>
                    )
                })}
            </ul>
        )
    }
}

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        console.log("inside handle submit");
        e.preventDefault()
        //this.props.sendMessage(this.state.message)
        let data =
        {
        	"chatId" : "5de48e956528003d3887b7b3",
          "senderId" : "5de03ca78752b30ca074122d",
          "receiverId" : "5de2f6f76156b960fccd9e01",
        	"message" : this.state.message
        }
        axios.post('/messages/addMessageToChat', data)
          .then((response) => {
              console.log('response ok',response)
              console.log("Status Code : ", response);
              if(response.data=="error")
              {
                  alert("Invalid credentials");
              }
              this.setState({});

          })
          .catch (response => {
              alert("Invalid");
              this.setState({});
            }
          )

    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
                <Button type="submit"/>
            </form>
        )
    }
}

function Title() {
  return <p className="title">My awesome chat app</p>
}


{/*
class MessageBox extends React.Component{

  constructor() {
    super()
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ''
    })
  }
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     messageId: this.props.dataFromParentForChat,
  //     name: this.props.dataFromParentForChat,
  //     userHandle: this.props.dataFromParentForChat,
  //     date: this.props.dataFromParentForChat,
  //   };
  // }

  render(){
    return(
      <div className="chat-div">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.message}
            placeholder="Type your message and hit ENTER"
            type="text"
          />
      </form>
      </div>
    )
  }
}
*/}

export default MessageBox;

{/*
  <div>
  {this.props.messagesList.map(message => {
    return(
      <div className="chatMessagesReceive">
        <p>{message.text}</p>
      </div>
    )
  })}
  </div>
  */}
