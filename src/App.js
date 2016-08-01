import React from 'react';
import LeftBar from './components/LeftBar';
import Content from './components/Content';
import Model from './components/Model';
import './styles/index.css';

const App = () => {
  return (
    <div className="container">
      <LeftBar />
      <Content />
      <Model />
    </div>
  );
};

module.exports = App;
