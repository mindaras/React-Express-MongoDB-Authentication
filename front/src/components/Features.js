import React, { Component } from 'react';
import '../styles/Features.css';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions/actionCreators';
import { bindActionCreators } from 'redux';

class Features extends Component {
  componentDidMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div className="features">
        <p className="features__message">Message: {this.props.message}</p>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    message: reduxState.message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Features);
