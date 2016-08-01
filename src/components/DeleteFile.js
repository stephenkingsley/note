import React from 'react';
import { connect } from 'react-redux';
import { deleteFile } from '../actions/note';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/index.css';

const deleteAFile = (props) => {
  const { dispatch, filename } = props;
  dispatch(deleteFile(filename));
};

const DeleteFile = (props) => {
  const { title } = props;
  const btnStyle = {
    height: '36px',
    minHeight: '36px'
  };
  return (
    <div className="delete_a_file_title delete_a_file_top_bar">
      <div className="delete_a_file_title">
        <div>ARE YOU SURE DELETE FILE</div>
        <div className="delete_a_file_file_title">
          <strong>
            {title}
          </strong>
        </div>
      </div>
      <div>
        <RaisedButton
          label="DELETE"
          secondary
          style={btnStyle}
          labelStyle={{ lineHeight: '36px' }}
          onClick={() => deleteAFile(props)}
        />
      </div>
    </div>
  );
};

DeleteFile.propTypes = {
  title: React.PropTypes.string.isRequired,
  filename: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return state.note.deleteFile;
}

module.exports = connect(mapStateToProps)(DeleteFile);
