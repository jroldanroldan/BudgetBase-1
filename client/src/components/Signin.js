import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import BBlogo from '../assets/logo/BudgetBase-Logo-dark.png';
import BBlight from '../assets/logo/BudgetBase-Logo-light@2x.png';
import profileDump from '../assets/img/profile-dump.jpg';
import SlidePhrase from '../assets/img/Phrase.png';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: null };
  }

  componentWillReceiveProps({ error }) {
    this.setState({ error: error });
  }

  render() {
    return (
      <div className='row no-margin-bottom'>
        <div className='col s12 m12 hide-on-large-only center-align'>
          <img className='light-logo' src={BBlight} alt='BudgetBase logo' />
        </div>
        <div className='col s12 m12 l5 slide-form'>
          <img
            className='signIn-logo hide-on-med-and-down'
            src={BBlogo}
            alt='BudgetBase'
          />
          <div className='center-align'>
            <img
              className='circle responsive-img hide-on-large-only profile-image'
              src={profileDump}
              alt='Profile'
            />
          </div>
          <h4 className='title'>Log In Into Your Account</h4>
          <form onSubmit={this.handleSubmit}>
            {this.renderError()}
            <div className='input-field col s12'>
              <label>Email</label>
              <input
                name='email'
                type='email'
                onChange={this.handleChange}
                required
              />
              <i class='material-icons form-ico'>mail_outline</i>
            </div>
            <div className='input-field col s12'>
              <label>Password</label>
              <br />
              <input
                name='password'
                type='password'
                onChange={this.handleChange}
                required
              />
              <i className='material-icons form-ico'>lock_outline</i>
              <Link to='/forgot-password' className='link-a right'>
                Forgot password?
              </Link>
            </div>
            <div className='input-field col s12 submit'>
              <button className='btn custom-btn btn-login' type='submit'>
                Log In
              </button>
              <button className='btn custom-btn btn-social-fb' type='submit'>
                <i class='fab fa-facebook-square social-icon'></i>Log in with
                Facebook
              </button>
              <Link to='/signup' className='link-a center' id='link-newAccount'>
                Create a new account
              </Link>
            </div>
          </form>
        </div>
        <div
          className='col l7 hide-on-med-and-down slide-image'
          id='signIn-image'
        >
          <img className='login-phrase' src={SlidePhrase} alt='phrase' />
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------------
  // Form Handlers and Render Helpers
  // -----------------------------------------------------------------------------
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signin(this.state);
  };

  renderError = () => {
    if (this.state.error) {
      return (
        <div className='card-panel red lighten-1 white-text alert'>
          {this.state.error}
        </div>
      );
    }
  };
}

export default Signin;
