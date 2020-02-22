import React from 'react';
import SockJsClient from "react-stomp";
import UsernameGenerator from "username-generator";
import Fetch from "json-fetch";
import { TalkBox } from "react-talk";
import randomstring from"randomstring";

class Chatt extends React.Component {
 
  constructor(props) {
    super(props);
    // randomUserId is used to emulate a unique user id for this demo usage
    this.randomUserName = UsernameGenerator.generateUsername("-");
    this.randomUserId = randomstring.generate();
    this.sendURL = "/message";
    this.state = {
      clientConnected : false,
      messages : [],
      time: new Date()
    };
    
  }

  onMessageReceive = (msg, topic) => {
    //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
    this.setState(prevState => ({
      messages: [...prevState.messages, msg]
    }));
    this.setState({ time: new Date() });
  }

  sendMessage = (msg, selfMsg) => {
    try {
      var send_message = {
        "user" : selfMsg.author,
        "message" : selfMsg.message
      }
      this.clientRef.sendMessage("/app/message", JSON.stringify(send_message));
      this.setState({ time: new Date() });
      this.setState(prevState=>({messages: [...prevState.messages, selfMsg]}));
      return true;
    } catch(e) {
        this.setState({ time: new Date() });
      return false;
    }
  }

  componentWillMount() {
    // console.log("call history");
    Fetch("/history", {
      method: "GET"
    }).then((response) => {
      this.setState({ messages: response.body });
    });
  }

  render() {
    const wsSourceUrl = "http://192.168.100.60:9999/chatting";
    return (
      <div>
        <TalkBox topic="/topic/public" currentUserId={ this.randomUserId }
          currentUser={ this.randomUserName } messages={ this.state.messages }
          onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>
        
        <SockJsClient url={ wsSourceUrl } topics={["/topic/public"]}
          onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
          onConnect={ () => {this.setState({ clientConnected: true }) } }
          onDisconnect={ () => { this.setState({ clientConnected: false }) } }
          debug={ false } style={[{width:'100%', height:'100%'}]}/>
      </div>
    );
  }
}

export default Chatt;

// import React, { useState, useEffect, useRef } from "react";
// import SockJsClient from "react-stomp";
// import UsernameGenerator from "username-generator";
// import Fetch from "json-fetch";
// import { TalkBox } from "react-talk";
// import randomstring from "randomstring";

// const Chatt = () => {
//   const [randomUserName, setUserName] = useState(
//     UsernameGenerator.generateUsername("-")
//   );
//   const [randomUserId, setRandomUserId] = useState(randomstring.generate());
//   const [sendURL, setSendURL] = useState("/message");
//   const [clState, setState] = useState({
//     clientConnected: false,
//     messages: []
//   });
//   const [clientRef, setClientRef] = useState(useRef());
//   const onMessageReceive = (msg, topic) => {
//     //alert(JSON.stringify(msg) + " @ " +  JSON.stringify(this.state.messages)+" @ " + JSON.stringify(topic));
//     console.log(msg);
//     let tempMessages = ["dsdsds", "sdlkasdmklfsm", "sdlfkmsdklmdf"];
//     setState({messages: tempMessages});
//   };

//   const sendMessage = (msg, selfMsg) => {
//     try {
//       var send_message = {
//         user: selfMsg.author,
//         message: selfMsg.message
//       };
//       clientRef.sendMessage("/app/message", JSON.stringify(send_message));
//       return true;
//     } catch (e) {
//       return false;
//     }
//   };
//   useEffect(() => {
//     console.log("call history");
//     Fetch("/history", {
//       method: "GET"
//     }).then(response => {
//       setState({ messages: response.body });
//     });
//   }, []);

//   const wsSourceUrl = "http://192.168.100.60:9999/chatting";
//   return (
//     <div>
//       <TalkBox
//         topic="/topic/public"
//         currentUserId={randomUserId}
//         currentUser={randomUserName}
//         messages={clState.messages}
//         onSendMessage={sendMessage}
//         connected={clState.clientConnected}
//       />

//       <SockJsClient
//         url={wsSourceUrl}
//         topics={["/topic/public"]}
//         onMessage={onMessageReceive}
//         ref={client => {
//             setClientRef(client);
//         }}
//         onConnect={() => {
//           setState({ clientConnected: true });
//         }}
//         onDisconnect={() => {
//           setState({ clientConnected: false });
//         }}
//         debug={false}
//         style={[{ width: "100%", height: "100%" }]}
//       />
//     </div>
//   );
// };

// export default Chatt;

