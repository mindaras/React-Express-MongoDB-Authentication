import React, { Component } from 'react';
import '../../styles/form.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signinUser, authError } from '../../actions/actionCreators';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    this.props.authError('');
  }

  submitHandler(e) {
    e.preventDefault();

    const email = this.state.email,
          password = this.state.password;

    // Validates fields
    if (!email || !password) {
      return this.props.authError('Please fill in all of the fields');
    }

    const redirect = (url) => {
      this.props.history.push(url);
    }

    this.props.signinUser({email, password, redirect});
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
    signinUser,
    authError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
