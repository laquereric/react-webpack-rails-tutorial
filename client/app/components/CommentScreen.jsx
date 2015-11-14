import React, { PropTypes } from 'react';
import CommentBox from './CommentBox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentsActionCreators from '../actions/commentsActionCreators';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$commentsStore };
}

class CommentScreen extends React.Component {
  static displayName = 'CommentScreen';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(commentsActionCreators, dispatch);
    return (
      <div>
        <CommentBox
          pollInterval={5000}
          data={data}
          actions={actions}
          ajaxCounter={data.get('ajaxCounter')}
        />
      </div>
    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(CommentScreen);
