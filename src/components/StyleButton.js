import React, { Component } from 'react';

export default class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

StyleButton.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  style: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired,
  label: React.PropTypes.string.isRequired
};
