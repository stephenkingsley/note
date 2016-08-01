import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chooseLeftBarItem, showDeleteFile, showTheMarkDownView } from '../actions/note';
import { formatDate } from '../util/date';
import '../styles/leftBarItem.css';

class LeftBarItem extends Component {
  constructor() {
    super();
    this.state = {
      mouseIsOver: false
    };
  }

  chooseItem(fileName) {
    const { dispatch } = this.props;
    dispatch(chooseLeftBarItem(fileName));
  }

  mouseOverAndOut(mouseIsOver) {
    this.setState({
      mouseIsOver
    });
  }

  showTheMarkDown() {
    const { dispatch, value } = this.props;
    dispatch(showTheMarkDownView(value.fileIndex));
  }

  deleteItem() {
    const { value } = this.props;
    this.props.dispatch(showDeleteFile(value.title, value.fileIndex));
  }

  render() {
    const { value } = this.props;
    const { mouseIsOver } = this.state;
    return (
      <div
        className="left_bar_item_container"
        onClick={() => this.chooseItem(value.fileIndex)}
        onMouseEnter={() => this.mouseOverAndOut(true)}
        onMouseLeave={() => this.mouseOverAndOut(false)}
      >
        <div className="left_bar_item_container_title">
          {value.title}
        </div>
        <div className="left_bar_item_container_time">
          {formatDate(value.date)}
          {
            mouseIsOver &&
              <div>
                <i
                  className="fa fa-eye left_bar_item_margin_left"
                  aria-hidden
                  onClick={() => this.showTheMarkDown()}
                >
                </i>
                <i
                  className="fa fa-trash left_bar_item_margin_left"
                  aria-hidden
                  onClick={() => this.deleteItem()}
                >
                </i>
              </div>
          }
        </div>
      </div>
    );
  }
}

LeftBarItem.propTypes = {
  value: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

module.exports = connect()(LeftBarItem);
