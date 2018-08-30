import React, { Component } from 'react';
import './styles/PomodoroStyle.scss';
let timeInterval;
const remind={
  color: 'red'
};
const cont={

}
class Pomodoro extends Component{
  constructor(props) {
    super(props);
    this.state = {
      breakVal: 5,
      sessionVal: 25,
      minute: 25,
      second: 0,
      working: false,
      sessionTime: true,
      firstTodo: true,
      breakTime: false,
      /*todo is controlling session time showing or hiding*/
      todo: false,
      nowGoingKey: '',
      nowGoingName:'',
      todoInPomodoro:{
        "list":[]
      }

    };
    this.secondCalculate = this.secondCalculate.bind(this);
    this.minuteCalculate = this.minuteCalculate.bind(this);
    this.continueTime = this.continueTime.bind(this);
    this.setMS = this.setMS.bind(this);
  }
  breakClicked(value) {
    let prevState = this.state.breakVal;
    if(this.state.working){}
    else{
    if (value == "+" && prevState <60) {
      prevState = prevState + 1;
      this.setState({
        breakVal: prevState
      });
    } else if (value == "-" && prevState > 1) {
      prevState = prevState - 1;
      this.setState({
        breakVal: prevState
      });
    }
    }
  }
  sessionClicked(value) {
    let prevState = this.state.sessionVal;
     if(this.state.working){}
    else{
    if (value == "+" && prevState < 60) {
      prevState = prevState + 1;
      this.setState({
        sessionVal: prevState,
        minute: prevState
      });
    } else if (value == "-" && prevState > 1) {
      prevState = prevState - 1;
      this.setState({
        sessionVal: prevState,
        minute: prevState
      });
    }
    }
  }
  resetTime() {
    clearInterval(timeInterval);
    this.setState({
      breakVal: 5,
      sessionVal: 25,
      minute: 25,
      second: 0,
      working: false
    });
     this.audio.pause();
      this.audio.currentTime = 0;
  }
  secondCalculate() {
    let s = this.state.second;
    if (s < 10) {
      s = "0" + s;
      return s;
    } else return s;
  }
  minuteCalculate(){
       let m = this.state.minute;
    if (m < 10) {
      m = "0" + m;
      return m;
    } else return m;
  }

  setMS(minute, second) {
    this.setState({
      minute: minute,
      second: second
    });
  }
  continueTime() {
    let minute = this.state.minute;
    let second = this.state.second;
    if (second == 0 && minute == 0) {
      this.audio.play();
      this.audio.currentTime = 7;
      if(this.state.todo){
      if(this.state.sessionTime){
        this.setState({
          sessionTime: false,
          breakTime: true,
          minute: this.state.breakVal,
          second: 0
        })
      }
      else{
         this.setState({
          sessionTime: true,
          breakTime: false,
          minute: this.state.sessionVal,
          second: 0
        })
      }
    }
      else{
        /*If currently breakTime end next must to continue list*/
        if(!breakTime){
          const keyList = this.state.nowGoingKey + 1;
          this.setState({
            breakTime: true,
            minute: this.state.todoInPomodoro.list[keyList-1].minute,
            nowGoingKey: keyList,
            nowGoingName:this.state.todoInPomodoro.list[keyList-1].name
          })
        }
        /*If currently ListTime end next must to continue breakTime*/
        else{
          this.setState({
            breakTime: false,
            minute: this.state.breakVal,
            nowGoingName: 'BreakTime'
          })
        }

      }
    }

    else{
    if (second == 0 && minute > 0) {
      minute = minute - 1;
      second = 59;
    } else if (second > 0) {
      second = second - 1;
    }
      this.setMS(minute, second);
    }

  }
  startStop(value) {
    var incomeValue = value;
    this.setState({
      working: !incomeValue
    });
    if (value) {
      clearInterval(timeInterval);
    }
    else {
      timeInterval = setInterval(this.continueTime, 1000);
    }
  }
componentWillReceiveProps(nextProps){
  {/*When Component recieve props from App.js
    IF it's equal to null code will undestand delete all the lists
    */}
  if(nextProps.todolist== null){
    this.setState({
      todoInPomodoro: {
        "list":[],
      },
      todo: false,
      firstTodo: true
    });
  }
  /*When Component recieve props from App.js
    IF it's not equal to prevState it must to add this props to my state
    */
  else if(nextProps.todolist !== this.props.todolist){
    this.state.todoInPomodoro.list.push(nextProps.todolist);
    /*In below if statement invoke 1 time because of state firstTodo never change another function*/
    if(this.state.firstTodo){
      this.setState({
      minute: this.state.todoInPomodoro.list[0].minute,
      nowGoingName:this.state.todoInPomodoro.list[0].name,
      nowGoingKey:1,
      firstTodo: false,
      todo: true,
    })
    }
  }
  /*When Component recieve props from App.js
    IF it's faced to another case can't add yet
    */
  else console.log('nothing to add!');

}

  render() {
    const len = this.state.todoInPomodoro.list.length;

    return (
      <div className="Pomodoro">
        <audio id='beep' src='http://www.orangefreesounds.com/wp-content/uploads/2015/04/Loud-alarm-clock-sound.mp3' ref={(audio) => { this.audio = audio}}
        />
      <h3 id="title">Pomodoro Clock</h3>
      {len!=0 ? `You have ${len} task todo!`: null}
       {/* Break/Session controlling */}
        <div id="controlTime">
          <div className="break">
            <h5 id="break-label">Break Length</h5>
            <div className='eachSection'>
            <button id="break-increment" onClick={() => this.breakClicked("+")}>
              +
            </button>
            <p id="break-length">{this.state.breakVal}</p>
            <button id="break-decrement" onClick={() => this.breakClicked("-")}>
              -
            </button>
            </div>
          </div>
          <div className="session">
            <h5 id="session-label">Session Length</h5>
            {/*If user use todo section we don't need to controlling section timer*/}
            {!this.state.todo ?
              <div className='eachSection'>
                        <button
                          id="session-increment"
                          onClick={() => this.sessionClicked("+")}
                        >
                          +
                        </button>
                          <p id="session-length">{this.state.sessionVal}</p>
                        <button
                          id="session-decrement"
                          onClick={() => this.sessionClicked("-")}
                        >
                          -
                        </button>
                      </div>:
                      <div>{this.state.nowGoingName}</div>
            }

          </div>
        </div>
        {/* Time controlling */}
        <div className="time-display" style={this.state.minute>1? cont:remind}>
          <h4 id="timer-label">
            {this.state.sessionTime ? "Session" : "Break"}
          </h4>
          <p id="time-left">
            {this.minuteCalculate()}:{this.secondCalculate()}
          </p>
        </div>
        {/* Button controlling */}
        <div id="control-btns">
          <button
            id="start_stop"
            onClick={() => this.startStop(this.state.working)}
          >
            {this.state.working ? "Stop" : "Start"}
          </button>
          <button id="reset" onClick={() => this.resetTime()}>
            Reset
          </button>
        </div>
        {/*Created by Buman-Erdene :) */}
        <p id="footer">
          Created by <a href="https://bumanerdene.github.io/">Buman-Erdene.</a>
        </p>
      </div>
    );
  }
}

export default Pomodoro;
