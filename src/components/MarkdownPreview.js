import React from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-markdown';

const MarkdownPreview = (props) => {
  const { content } = props;
  return (
    <div>
      <Markdown source={content} />
    </div>
  );
};

MarkdownPreview.propTypes = {
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state.note.markdownContent;
}

module.exports = connect(mapStateToProps)(MarkdownPreview);
