import React from 'react';
import { connect } from 'react-redux';
import { hideTheModel } from '../actions/note';
import Dialog from 'material-ui/Dialog';
import AddFile from './AddFile';
import DeleteFile from './DeleteFile';
import MarkdownPreview from './MarkdownPreview';

const switchComponent = (props) => {
  const { type, title } = props;
  switch (type) {
    case 'ADD_A_File':
      return 'NEW FILE';
    case 'DELETE_A_FILE':
      return 'DELETE FILE';
    case 'MARKDOWN_PREVIEW':
      return title;
    default:
      return '';
  }
};

const switchRenderComponent = (type) => {
  switch (type) {
    case 'ADD_A_File':
      return <AddFile />;
    case 'DELETE_A_FILE':
      return <DeleteFile />;
    case 'MARKDOWN_PREVIEW':
      return <MarkdownPreview />;
    default:
      return <div></div>;
  }
};

const handleClose = (dispatch) => {
  dispatch(hideTheModel());
};

const Model = (props) => {
  const { show, type } = props;
  return (
    <Dialog
      title={switchComponent(props)}
      modal={false}
      open={show}
      autoScrollBodyContent
      onRequestClose={() => handleClose(props.dispatch)}
    >
    {switchRenderComponent(type)}
    </Dialog>
  );
};

Model.propTypes = {
  show: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state.note.showTheAddModel;
}

module.exports = connect(mapStateToProps)(Model);
