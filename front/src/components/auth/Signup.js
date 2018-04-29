import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupUser, authError } from '../../actions/actionCreators';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: ''
    };
  }

  componentWillMount() {
    this.props.authError('');
  }

  submitHandler(e) {
    e.preventDefault();

    const email = this.state.email,
          password = this.state.password,
          passwordConfirm = this.state.passwordConfirm;

    // Validates fields
    if (!email || !password || !passwordConfirm) {
      return this.props.authError('Please fill in all of the fields');
    } else if (password !== passwordConfirm) {
      return this.props.authError('Passwords don\'t match');
    }

    const redirect = (url) => {
      this.props.history.push(url);
    }

    this.props.signupUser({email, password, redirect});
  }

  changeHandler(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  renderError() {
    if (this.props.error) {
      return <p className="error">{this.props.error}</p>;
    }
  }

  render() {
    return (
      <form onSubmit={this.submitHandler} className="form">
        <fieldset className="fieldset">
          <label className="label">Email:</label>
          <input name="email"
                 type="email"
                 value={this.state.email}
                 onChange={this.changeHandler}
                 className="input"
                 placeholder="Enter your email"/>
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Password</label>
          <input name="password"
                 type="password"
                 value={this.state.password}
                 onChange={this.changeHandler}
                 className="input"
                 placeholder="Enter your password"/>
        </fieldset>
        <fieldset className="fieldset">
          <label className="label">Confirm Password</label>
          <input name="passwordConfirm"
                 type="password"
                 value={this.state.passwordConfirm}
                 onChange={this.changeHandler}
                 className="input"
                 placeholder="Confirm your password"/>
        </fieldset>
        <input type="submit" value="submit" className="submit" />
        {this.renderError()}
      </form>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    error: reduxState.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signupUser,
    authError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
