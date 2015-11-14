import React, { PropTypes } from 'react';
import Input from 'react-bootstrap/lib/Input';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import _ from 'lodash';

const emptyComment = { author: '', text: '' };
const textPlaceholder = 'Say something using markdown...';

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formMode: 0,
      comment: emptyComment,
    };

    _.bindAll(this, '_handleSelect', '_handleChange', '_handleSubmit', '_resetAndFocus');
  }

  static displayName = 'CommentForm';

  static propTypes = {
    ajaxSending: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    error: PropTypes.any,
  };

  _handleSelect(selectedKey) {
    this.setState({ formMode: selectedKey });
  }

  _handleChange() {
    let comment;

    if (this.state.formMode < 2) {
      comment = {
        author: this.refs.author.getValue(),
        text: this.refs.text.getValue(),
      };
    } else {
      comment = {
        // This is different because the input is a native HTML element
        // rather than a React element.
        author: this.refs.inlineAuthor.getDOMNode().value,
        text: this.refs.inlineText.getDOMNode().value,
      };
    }

    this.setState({ comment });
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { actions } = this.props;
    actions
      .submitComment(this.state.comment)
      .then(this._resetAndFocus);
  }

  _resetAndFocus() {
    // Don't reset a form that didn't submit, this results in data loss
    if (this.props.error) return;

    const comment = { author: this.state.comment.author, text: '' };
    this.setState({ comment });

    let ref;
    if (this.state.formMode < 2) {
      ref = this.refs.text.getInputDOMNode();
    } else {
      ref = React.findDOMNode(this.refs.inlineText);
    }

    ref.focus();
  }
  
  _formInline() {
    return (
      <div>
        <hr />
        <form className="commentForm form" onSubmit={this._handleSubmit}>
          <Input label="Inline Form" wrapperClassName="wrapper">
            <Row>
              <Col xs={3}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  ref="inlineAuthor"
                  value={this.state.comment.author}
                  onChange={this._handleChange}
                  disabled={this.props.ajaxSending}
                />
              </Col>
              <Col xs={8}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={textPlaceholder}
                  ref="inlineText"
                  value={this.state.comment.text}
                  onChange={this._handleChange}
                  disabled={this.props.ajaxSending}
                />
              </Col>
              <Col xs={1}>
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Post"
                  disabled={this.props.ajaxSending}
                />
              </Col>
            </Row>
          </Input>
        </form>
      </div>
    );
  }

  _errorWarning() {
    // If there is no error, there is nothing to add to the DOM
    if (!this.props.error) return undefined;
    return (
      <Alert bsStyle="danger" key="commentSubmissionError">
        <strong>Your comment was not saved! </strong>
        A server error prevented your comment from being saved. Please try again.
      </Alert>
    );
  }

  render() {
    let inputForm = this._formInline();
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="element"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {this._errorWarning()}
        </ReactCSSTransitionGroup>
        {inputForm}
      </div>
    );
  }
}

export default CommentForm;
