import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react'

import Library from './components/Library';
import TrackPlayer from './components/TrackPlayer';

import { authentication } from './services/Authentication';

import './App.css';

class App extends Component {
  state = {
    activePage: <Library />,
    activeItem: 'library',
    authorized: false,
    accessToken: ''
  }

  componentDidMount() {
    const { authorized } = this.state;
    if (authorized === false || authorized === null) {
      this.checkAuthorization();
    }
  }

  changeActiveItem = (component) => {
    if (component === this.state.activeItem) return; 
    switch (component) {
      case 'library':
        return this.setState({ activePage: <Library />, activeItem: 'library' });
      case 'trackplayer':
        return this.setState({ activePage: <TrackPlayer />, activeItem: 'trackplayer' });
      default:
        return;
    }
  }

  checkAuthorization = () => {
    const { accessToken, authorized } = this.state;
    if (accessToken === '' || accessToken === null) {
      authentication.authenticate();
    }
    else
    {

    }
  }

  render() {
    let { activePage, activeItem } = this.state;

    return (
      <div className="App">
        <Container id="appContainer" fluid style={{padding: '0px'}}>
            <NavMenu activeItem={activeItem} changeActiveItem={this.changeActiveItem} />
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
