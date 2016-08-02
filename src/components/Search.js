import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import { showTheAddFileModel } from '../actions/note';
import { inputStyle } from '../constant/ui';
import '../styles/search.css';

class Search extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.state = {
      text: '',
    };
  }

  onChange(event, text) {
    this.setState({
      text
    });
    this.props.onSearch(text);
  }

  showTheAddModel() {
    const { dispatch } = this.props;
    dispatch(showTheAddFileModel());
  }

  render() {
    const { text } = this.state;
    return (
      <div className="search_container">
        <TextField
          hintText=" 🔍"
          inputStyle={inputStyle}
          hintStyle={inputStyle}
          value={text}
          onChange={this.onChange}
        />
        <div
          className="search_container_add_btn"
          onClick={() => this.showTheAddModel()}
        >
          +
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  onSearch: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

module.exports = connect()(Search);
