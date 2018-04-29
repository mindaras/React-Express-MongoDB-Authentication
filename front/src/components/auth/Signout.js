import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signoutUser } from '../../actions/actionCreators';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signoutUser
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Signout);
