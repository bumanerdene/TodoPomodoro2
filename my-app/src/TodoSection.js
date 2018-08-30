import React, { Component } from 'react';
import Pomodoro from './Pomodoro';
import './styles/Todo.scss';

class TodoSection extends Component {
  constructor(props){
    super(props);
    this.state={
      todoValue: '',
      todoMinute:'',
      todoList: {
          "list": []
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    const val = e.target.name;
    this.setState({
      [val]: e.target.value
    })
  }
  handleClick(){
    let indexList = this.state.todoList.list.length + 1;
    let jsonList = {"name":this.state.todoValue, "minute":this.state.todoMinute, "key":indexList };
    this.state.todoList.list.push(jsonList);
this.setState({
  todoValue: '',
  todoMinute:''
})
console.log('added baihaa' + this.state.todoList.list.length)
this.props.getDataFromTodo(jsonList);
console.log("Inside Todo.js Component updated and send Todo data to App.js")

  }
  EmptyList(){
    this.setState({
      todoList: {
        "list":[]
      }
    });
  console.log('empty list clicked');
  this.props.getDataFromTodo();
  }

  render() {
    const List = this.state.todoList["list"].map(list =><tr>
    <td>{list.name} </td>
    <td>{list.minute}</td>
  </tr>);
    return (
      <div className='TodoBody'>
            <div className='listBody'>
            <table>
              <tr>
    <th style={{textAlign: 'left'}}>List</th>
    <th style={{textAlign: 'left'}}>Time</th>
  </tr>
  {List}
            </table>
          </div>
          <div className='addList'>
            <input type='text' value={this.state.todoValue} name='todoValue' onChange={this.handleChange}/>
            <input type='number' value={this.state.todoMinute} name='todoMinute' onChange={this.handleChange} />
            <button className='addlistBtn' onClick={this.handleClick.bind(this)}>Add</button>
          </div>
          <button className='clearList' onClick={this.EmptyList.bind(this)}>Clear List</button>

      </div>
    );
  }
}

export default TodoSection;
