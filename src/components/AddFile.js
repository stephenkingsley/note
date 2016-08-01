import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createANewFile } from '../actions/note';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/index.css';

class AddFile extends Component {
  constructor() {
    super();
    this.state = {
      filename: ''
    };
  }

  change(filename) {
    this.setState({
      filename
    });
  }

  addFile() {
    const { filename } = this.state;
    if (filename) {
      this.props.dispatch(createANewFile(filename));
    }
  }

  render() {
    const { filename } = this.state;
    const btnStyle = {
      height: '36px',
      minHeight: '36px',
      marginTop: '7px'
    };
    return (
      <div className="add_a_File_container">
        <TextField
          placeholder="FILE NAME"
          name="file_name"
          onChange={(ev, name) => this.change(name)}
          value={filename}
        />
        <RaisedButton
          label="SAVE"
          primary
          style={btnStyle}
          disabled={filename === ''}
          labelStyle={{ lineHeight: '36px' }}
          onClick={() => this.addFile()}
        />
      </div>
    );
  }
}


AddFile.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

module.exports = connect()(AddFile);
