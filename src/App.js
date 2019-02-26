import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'

import Library from './components/Library';
import TrackPlayer from './components/TrackPlayer';
import Login from './components/Login';

import MessageBox from './components/MessageBox';
import NavMenu from './components/NavMenu';

import './App.css';

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
      this.redirectToLogin();
    }
  }

  redirectToLogin = () => {
    this.setState({
      message:  <MessageBox 
                  header='You are not logged in.'
                  content='You will be redirected for sign on.'
                  isConfirm={true}
                  callbackOK={this.redirectToLogin}
                />
    });
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
        <div style={{height: '100%'}}>
          {message}
          <Login />
        </div>
      );
    }
  }
}

export default App;
