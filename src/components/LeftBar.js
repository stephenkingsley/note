import React, { Component } from 'react';
import Search from './Search';
import LeftBarList from './LeftBarList';
import { connect } from 'react-redux';
import { getTheLeftBarList } from '../actions/note';
import _ from 'lodash';
import '../styles/leftbar.css';

class LeftBar extends Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
    this.state = {
      list: [],
      copyList: []
    };
  }

  componentWillMount() {
    this.props.dispatch(getTheLeftBarList());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      list: nextProps.list,
      copyList: nextProps.list
    });
  }

  search(text) {
    const { copyList } = this.state;
    let cloneList;
    if (text !== '') {
      cloneList = _.filter(copyList, (ele) => {
        return ele.title.toLocaleLowerCase().match(text.toLocaleLowerCase()) !== null;
      });
    } else {
      cloneList = copyList;
    }
    this.setState({
      list: cloneList
    });
  }

  render() {
    const { dispatch } = this.props;
    const { list } = this.state;
    return (
      <div className="leftbar_container">
        <Search
          onSearch={this.search}
        />
        <LeftBarList
          dispatch={dispatch}
          list={list}
        />
      </div>
    );
  }
}

LeftBar.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return state.note.leftBar;
}

module.exports = connect(mapStateToProps)(LeftBar);
