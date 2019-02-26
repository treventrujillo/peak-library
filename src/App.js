import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react'

import Library from './components/Library';
import TrackPlayer from './components/TrackPlayer';
import MessageBox from './components/MessageBox';
import NavMenu from './components/NavMenu';

import './App.css';
import { authentication } from './services/Authentication';

class App extends Component {
  state = {
    activePage: <Library />,
    activeItem: 'library',
    authorized: false,
    message: ''
  }

  componentDidMount() {
    const { authorized } = this.state;
    if (authorized === false) {
      this.displayAuthMessage();
    }
  }

  displayAuthMessage = () => {
    this.setState({
      message:  <MessageBox 
                  header='You are not logged in.'
                  content='You will be redirected for sign on.'
                  isConfirm={true}
                  callbackOK={this.redirectToLogin}
                />
    });
  }

  redirectToLogin = () => {
    
  }

  changeActiveItem = (component) => {
    if (component === this.state.activeItem) return; 
    switch (component) {
      case 'trackplayer':
        return this.setState({ activePage: <TrackPlayer />, activeItem: 'trackplayer' });
      case 'library':
      default:
        return this.setState({ activePage: <Library />, activeItem: 'library' });
    }
  }
  
  render() {
    let { activePage, activeItem, message, authorized } = this.state;
    
    if (authorized === true) {
      return (
        <div className="App">
          <Container id="appContainer" fluid style={{padding: '0px'}}>
              <NavMenu activeItem={activeItem} changeActiveItem={this.changeActiveItem} />
              {message}
              {activePage}
          </Container>
        </div>
      );
    }
    else {
      return (
        <div id="Login">
            <h2 id="login-header">Welcome to Peak Library</h2>
            <Button onClick={authentication.authenticate}>Sign in</Button>
        </div>
      );
    }
  }
}

export default App;
