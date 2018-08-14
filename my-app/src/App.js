import React, { Component } from 'react';
import Pomodoro from './Pomodoro';
import TodoSection from './TodoSection';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='MainBody'>
        <TodoSection />
        <Pomodoro />
      </div>
    );
  }
}

export default App;
