import React, { Component } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    if (!this.props.authenticated) {
      return [
        <Link to="/signin" key={1} className="link">Sign In</Link>,
        <Link to="/signup" key={2} className="link">Sign Up</Link>
      ];
    } else {
      return <Link to="/signout">Sign Out</Link>;
    }
  }

  render() {
    return (
      <nav className="header">
        <Link to="/" className="link">Home</Link>
        {this.renderLinks()}
      </nav>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.authenticated
  };
}

export default connect(mapStateToProps)(Header);
