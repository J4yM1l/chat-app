import React, { Component } from "react";
import PropTypes from "prop-types";
import {Grid, Cell, Button, TextField, DialogContainer} from 'react-md';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


import './global.js';



class Form extends Component {
  static propTypes = {
    mediaClass: PropTypes.string,
    disable: PropTypes.bool.isRequired, 
    channel: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
    this.state = {
      message: "",
      disable: props.disable,
      channel: props.channel,
      mediaClass: props.mediaClass,
      showEmoji: false,
    };
    navigator.serviceWorker.addEventListener('message', event => {
      console.log(event.data);
      if(event.data.user == this.props.user.username && event.data.msg){
        console.log(event.data.msg);
        this.setState({message: event.data.msg}, () => {this.handleSubmit(event)});
      }
      return;
    });
  }
  
  onEmojiHide = () => {
    this.setState({ showEmoji: false });
  };
  onEmojiShow = () => {
    this.setState({showEmoji: true});
  }
  onEmojiAdd = (data) => {
    console.log(data);
    this.setState(prevState => ({message: prevState.message +data.colons, showEmoji: false}));
  }
  handleChange(value, e){
    this.setState({ message: value});
  };
  handleSubmit = e => {
    e.preventDefault();
    const {message} = this.state;
    if(/\S/.test(message)){    
      this.setState({'message': ''});
      const message_data = { type: 'message_channel', user: this.props.user, message: message };
      chat_socket.send(JSON.stringify(message_data));
    }
  };
  render() {
    
    const {channel, showEmoji} = this.state;
    const buttonStyle = {
      float: 'right'
    }
    const textStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      marginBottom: '0',
      marginTop: '0',
    }
    const areaStyle = {
      lineHeight: '1.5em',
      marginBottom: '16px'
    }
    const Buttons = () => (
      <div>
        <Button style={buttonStyle} onClick={this.onEmojiShow} disabled={this.state.disable} icon primary>mood</Button>
        <Button style={buttonStyle} type="submit" disabled={this.state.disable} icon primary>send</Button>  
      </div>
    );
    return (
      <Grid className={'md-title md-title--toolbar ' + this.props.mediaClass} style={{marginRight: '0', width: '100%'}}>
        <Cell size={12}>
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="name" value={this.state.name}/>
              <TextField
                id="message-body"
                name="message"
                placeholder={"Message #"+channel.channel_name}
                block
                paddedBlock
                rows={1}
                maxRows={10}
                lineDirection={'right'}
                rightIcon={<Buttons />}
                onChange={(value, e) => this.handleChange(value, e)}
                onKeyPress={ (e) => {
                  if (e.key === 'Enter') {
                    this.handleSubmit(e);
                  }
                }}
                value={this.state.message}
                disabled={this.state.disable}
                style={textStyle}
                inputStyle={areaStyle}
              />  
              <DialogContainer
                id="simple-list-dialog"
                visible={showEmoji}
                title="Pick Emoji"
                onHide={this.onEmojiHide}
                dialogStyle={{width: '100%', height: '100%', maxHeight: '530px', maxWidth: '404px'}}
              >
                <Picker style={{whiteSpace: 'normal', width: '100%'}} emojiSize={32} set='twitter' onSelect={this.onEmojiAdd} />
              </DialogContainer>      
            </form>
          </Cell>
        </Grid>
    );
  }
}
export default Form;