import React, { PropTypes } from 'react';

import CommentForm from './CommentForm';
import CommentList from './CommentList';
import _ from 'lodash';

class CommentBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};

    _.bindAll(this, '_ajaxCounter', '_isSendingAjax');
  }

  static displayName = 'CommentBox';
  static propTypes = {
    pollInterval: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { fetchComments } = this.props.actions;
    fetchComments();
    setInterval(fetchComments, this.props.pollInterval);
  }

  _ajaxCounter() {
    return this.props.data.get('ajaxCounter');
  }

  _isSendingAjax() {
    return this._ajaxCounter() > 0;
  }

  render() {
    const { actions, data } = this.props;

    return (
      <div className="commentBox container">
        <h2>
          Comments { this._isSendingAjax() && `SENDING AJAX REQUEST! Ajax Counter is ${this._ajaxCounter()}` }
        </h2>
        <p>
          Text take Github Flavored Markdown. Comments older than 24 hours are deleted.
          <b>Name</b> is preserved, <b>Text</b> is reset, between submits.
        </p>
        <CommentForm
          ajaxSending={this._isSendingAjax()}
          error={data.get('submitCommentError')}
          actions={actions}
        />
        <CommentList
          $$comments={data.get('$$comments')}
          error={data.get('fetchCommentError')}
        />
      </div>
    );
  }
}

export default CommentBox;
