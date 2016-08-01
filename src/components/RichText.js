import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import '../styles/content.css';

const btnStyle = {
  height: '36px',
  minHeight: '36px',
  marginTop: '4px'
};
const labelStyle = {
  height: '36px',
  lineHeight: '36px',
  fontSize: '20px'
};

export default class RichText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.content))
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = (command) => this.onHandleKeyCommand(command);
    this.toggleBlockType = (type) => this.onToggleBlockType(type);
    this.toggleInlineStyle = (style) => this.onToggleInlineStyle(style);
    this.saveContent = () => this.onSaveContent();
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.content))
    };
  }

  onHandleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  onToggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  onToggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  onSaveContent() {
    const { editorState } = this.state;
    const content = editorState.getCurrentContent().getPlainText();
    this.props.saveContentToLocalhost(content);
  }

  render() {
    const { title } = this.props;
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Input Something you want"
            ref="editor"
            spellCheck="true"
          />
        </div>
        <div className="rich_text_save_btn">
          <FlatButton
            primary
            label="SAVE"
            disabled={title === ''}
            style={btnStyle}
            labelStyle={labelStyle}
            onClick={this.saveContent}
          />
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

RichText.propTypes = {
  content: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  saveContentToLocalhost: React.PropTypes.func.isRequired,
};
