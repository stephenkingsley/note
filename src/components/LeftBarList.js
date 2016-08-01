import React from 'react';
import LeftBarItem from './LeftBarItem';

const LeftBarList = (props) => {
  const { list } = props;
  return (
    <div>
      {
        list.map((ele, index) => {
          return (
            <LeftBarItem
              value={ele}
              key={index}
            />
          );
        })
      }
    </div>
  );
};

LeftBarList.propTypes = {
  list: React.PropTypes.array
};

module.exports = LeftBarList;
