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

const history = createBrowserHistory();
let auth = new Authentication();

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    let { cookies } = this.props;
    auth.checkToken(cookies.get("access_token") ? true : false);
  }

  render() {
    return (
      <CookiesProvider>
        <Router history={history}>
          <div className="App">
            <Container id="appContainer" fluid style={{padding: '0px'}}>
              <Navigation authorized={auth.authorized} />
              <Switch>
                <Route exact path="/" render={(props) => (
                  (auth.authorized) ? (
                    <Redirect to="/library" />
                  ) : (
                    <Redirect to="/login" />
                  ))} 
                />
                <Route path="/login" render={(props) => <Login {...props} auth={auth} />} />
                <PrivateRoute path="/library" render={(props) => <Library {...props} />} authorized={auth.authorized} />
                <PrivateRoute path="/trackplayer" render={(props) => <TrackPlayer {...props} />} authorized={auth.authorized} />
              </Switch>
            </Container>
          </div>
        </Router>
      </CookiesProvider>
    );
  }
}

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route 
      {...rest}
      render={(props) =>
      props.authorized ? (
        <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: "/login",
            state: { from: props.location }
          }} />
        )
      }
    />
  );
}

function Navigation() {
  return (
    ((props) => props.authorized === true ? (
      <NavMenu />
    ) : (
    <div></div>
    ))
  );
}

export default withCookies(App);
