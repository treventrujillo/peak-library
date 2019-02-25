import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react'

import Library from './components/Library';
import TrackPlayer from './components/TrackPlayer';
import MessageBox from './components/MessageBox';

import './App.css';
import Authentication from './services/Authentication';
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
    if (authorized === false) 
    {
      this.displayAuthMessage();
    }
  }

  displayAuthMessage = () => {
    this.setState({
      message:  <MessageBox 
                  header='You are unauthorized.'
                  content='Click OK to authenticate with Napster.'
                  isConfirm={true}
                  callbackOK={authentication.authenticate}
                />
    });
  }

  changeActiveItem = (component) => {
    if (component === this.state.activeItem) return; 
    switch (component) 
    {
      case 'trackplayer':
        return this.setState({ activePage: <TrackPlayer />, activeItem: 'trackplayer' });
      case 'library':
      default:
        return this.setState({ activePage: <Library />, activeItem: 'library' });
    }
  }

  render() {
    let { activePage, activeItem, message } = this.state;

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
}

const NavMenu = (props) => {
  const { activeItem, changeActiveItem } = props;
  return (
    <div id='navBarContainer'>
      <Menu
          id='navBar'
          vertical
          borderless
          fluid
          size='large'>
        <Container>
            <Menu.Item as='a' name='library' active={activeItem === 'library'} onClick={() => changeActiveItem('library')} />
            <Menu.Item as='a' name='trackplayer' active={activeItem === 'trackplayer'} onClick={() => changeActiveItem('trackplayer')} />
        </Container>
      </Menu>
    </div>
  );
}

export default App;
