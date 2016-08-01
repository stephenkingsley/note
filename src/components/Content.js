import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RichText from './RichText';
import { saveFile } from '../actions/note';
import { inputStyle } from '../constant/ui';
import '../styles/content.css';

class Content extends Component {
  constructor() {
    super();
    this.saveContent = (content) => this.onSaveContent(content);
    this.inputTitle = (ev, title) => this.setState({ title });
    this.state = {
      title: '',
      copyTitle: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      copyTitle: nextProps.title
    });
  }

  onSaveContent(content) {
    const { fileIndex, dispatch } = this.props;
    const { title } = this.state;
    const date = new Date().getTime();
    dispatch(saveFile(fileIndex, title, content, date));
  }

  renderNullPage() {
    return (
      <div className="content_null_page_title">
        stephen is awesome
      </div>
    );
  }

  renderContent() {
    const { content } = this.props;
    const { title } = this.state;
    return (
      <div>
        <div
          className="content_title"
        >
          <TextField
            style={{ width: '100%' }}
            hintText="INPUT YOUR TITLE"
            value={title}
            inputStyle={inputStyle}
            hintStyle={inputStyle}
            onChange={this.inputTitle}
          />
        </div>
        <div>
          <RichText
            content={content}
            title={title}
            saveContentToLocalhost={this.saveContent}
          />
        </div>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    return (
      <div className="content_container">
        {
          title ?
          this.renderContent() :
          this.renderNullPage()
        }
      </div>
    );
  }
}

Content.propTypes = {
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  fileIndex: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return state.note.content;
}

module.exports = connect(mapStateToProps)(Content);
