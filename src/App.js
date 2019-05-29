import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import {
   Router, 
   Route, 
   Switch,
   Redirect 
  } from 'react-router';
import { CookiesProvider, Cookies, withCookies} from 'react-cookie';

import Library from './components/Library';
import TrackPlayer from './components/TrackPlayer';
import Login from './components/Login';

import MessageBox from './components/MessageBox';
import NavMenu from './components/NavMenu';

import './App.css';
import Authentication from './services/Authentication';
import { instanceOf } from 'prop-types';
import createBrowserHistory from 'history/createBrowserHistory';
import OAuthProxy from './components/OAuthProxy';

const history = createBrowserHistory();
let auth = new Authentication();

class App extends Component {
  state = {
    authorized: false
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    let { cookies } = this.props;
    const isAuthorized = cookies.get("access_token") ? true : false;

    this.setState({ authorized: isAuthorized });
  }

  render() {
    const { authorized } = this.state;
    return (
      <CookiesProvider>
        <Router history={history}>
          <div className="App">
            <Container id="appContainer" fluid style={{padding: '0px'}}>
              {authorized ? 
              <Switch>
                <NavMenu />
                <Route path="/library" Component={Library} />
                <Route path="/trackplayer" Component={TrackPlayer} />
              </Switch> 
              :
              <div>
                <Route path="/login" Component={Login} />
                <Route path="/proxy/:procedure" render={({params}) => <OAuthProxy procedure={params.procedure} />} />
              </div>
              }
            </Container>
          </div>
        </Router>
      </CookiesProvider>
    );
  }
}

export default withCookies(App);
