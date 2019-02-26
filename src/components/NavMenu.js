import React from 'react';
import { Menu, Container } from 'semantic-ui-react';

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

export default NavMenu;