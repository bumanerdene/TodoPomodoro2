import React, { Component } from 'react';
import Pomodoro from './Pomodoro';
import TodoSection from './TodoSection';
import './styles/App.scss';

const MainBodywithtodo={
  display: "grid",
  gridTemplateColumns: "30% auto",
}
const MainBodyonlyPomodoro={
  display: "grid",
  gridTemplateColumns: "100%"
}
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      todo: true,
      todoList:{
        "list":[]
      },
      recentList:[]
    }
    this.getTodo=this.getTodo.bind(this);
  }
  handleTodoToggle(){
    this.setState({
      todo: !this.state.todo,
      recentList:null
    })
  
  }

  getTodo(jsonObject){
      this.state.todoList.list.push(jsonObject);
      this.setState({
        recentList: jsonObject
      })
    console.log("Inside APP.js Copied todo file!" + this.state.todoList.list.length);
  }
  render() {
      return (
      <div className='MainBody' style={this.state.todo? MainBodywithtodo:MainBodyonlyPomodoro}>
        <button onClick={this.handleTodoToggle.bind(this)} className='ToggleBtn'>{this.state.todo? "Off List":"On List"}</button>
        {this.state.todo? <TodoSection getDataFromTodo={this.getTodo}/>: null}
        <Pomodoro todolist={this.state.recentList}/>

      </div>
    );
  }
}

export default App;
