import React, { Component } from 'react';
import Pomodoro from './Pomodoro';
import './Todo.scss';

class TodoSection extends Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
    return (
      <div className='TodoBody'>
          <button className='clearList'>Clear List</button>
          <div className='listBody'></div>
          <div className='addList'>
            <input type='text'/>
            <input type='number' />
            <button>Add</button>
          </div>

      </div>
    );
  }
}

export default TodoSection;
