import { Component } from 'react';
import { createConnection } from './chat.js';

export default class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
    console.log('componentDidM');

  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    this.destroyConnection();
    console.log('componentWU');

  }

  setupConnection() {
    this.connection = createConnection(
      this.state.serverUrl,
      this.props.roomId
    );
    this.connection.connect();    
    console.log('componentConnect');

  }

  destroyConnection() {
    this.connection.disconnect();
    this.connection = null;
    console.log('componentDC');

  }

  render() {
    return (
      <>
        <label>
          Server URL:{' '}
          <input
            value={this.state.serverUrl}
            onChange={e => {
              this.setState({
                serverUrl: e.target.value
              });
            }}
          />
        </label>
        <h1>Welcome to the {this.props.roomId} room!</h1>
      </>
    );
  }
}
