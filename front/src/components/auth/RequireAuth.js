import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    componentWillUpdate() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(reduxState) {
    return {
      authenticated: reduxState.authenticated
    };
  }

  return connect(mapStateToProps)(Authentication);
}
