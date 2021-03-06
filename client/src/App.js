import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';

import './App.css';
import history from './history';
import Navigation from './components/Navigation';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Signout from './components/Signout';
import Dashboard from './components/Dashboard';
import Archive from './components/Archive';
import Setting from './components/Setting';
import Report from './components/Report';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null, error: null };
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('token') });
  }

  render() {
    return (
      <Router history={history}>
        <div>
          {/* <Navigation token={this.state.token} signout={this.signout} /> */}
          <Route 
            path="/" 
            render={() => {
              return localStorage.getItem('token')
                ? <Redirect to="/dashboard" />
                : <Redirect to="/signin" />
            }}
            exact 
          />
          <Route
            path="/signup"
            render={props => (
              <Signup
                {...props}
                signup={this.signup}
                error={this.state.error}
              />
            )}
          />
          <Route
            path="/signin"
            render={props => (
              <Signin
                {...props}
                signin={this.signin}
                error={this.state.error}
              />
            )}
          />
          <Route path="/signout" render={ props => <Signout {...props} signout={this.signout} />} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/archive" component={Archive} />
          <Route path="/setting" component={Setting} />
          <Route path="/report" component={Report} />
        </div>
      </Router>
    );
  }

  // -----------------------------------------------------------------------------
  // API Calls
  // -----------------------------------------------------------------------------
  signin = async form => {
    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      this.setState({ token: json.token });
      localStorage.setItem('token', json.token);
      history.push('/dashboard');
    } catch (error) {
      this.setState({ error: 'Invalid Credentials!' });
    }
  };

  signup = async form => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const json = await response.json();

      if (json.error) return this.setState({ error: json.error });

      this.setState({ token: json.token });
      localStorage.setItem('token', json.token);
      history.push('/dashboard');
    } catch (error) {
      this.setState({ error: 'Opps! Something went wrong!' });
    }
  };

  signout = () => {
    this.setState({ token: '' });
    localStorage.removeItem('token');
    history.push('/signin');
  };
}

export default App;
