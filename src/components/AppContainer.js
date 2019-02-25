import React, { Component } from 'react';

import { authentication } from '../services/Authentication';
import { request } from '../services/Request';

import {
    Container,
    Menu,
} from 'semantic-ui-react';

class AppContainer extends Component {

    render() {
        const { activeItem, activePage, changeActivePage } = this.props;

        return (
            <div>
            <Container style={{padding: '0px'}} fluid>
                <Menu
                    id='navBar'
                    borderless
                    attached='top'
                    size='large'>
                <Container>
                    <Menu.Item as='a' name='library' active={activeItem === 'library'} onClick={() => changeActivePage('library')}>Library</Menu.Item>
                    <Menu.Item as='a' name='trackplayer' active={activeItem === 'trackplayer'} onClick={() => changeActivePage('trackplayer')}>Now Playing</Menu.Item>
                </Container>
                </Menu>
            </Container>
            <Container>
                <div>
                    {activePage}
                </div>
            </Container>
        </div>
        );
    }
}

const track = {
    name: "We Were Young",
    artist: "Odesza",
    album: "Summer's Gone",
    year: 2012,
    artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
    duration: 192,
    source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
}

export default AppContainer;