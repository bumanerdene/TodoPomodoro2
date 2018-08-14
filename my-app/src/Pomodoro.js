import React, { Component } from 'react';
import './PomodoroStyle.scss';
let timeInterval;
const remind={
  color: 'red'
};
const cont={

}
class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakVal: 5,
      sessionVal: 25,
      minute: 25,
      second: 0,
      working: false,
      sessionTime: true,
      breakTime: false
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
      if(this.state.sessionTime){
        this.setState({
          sessionTime: false,
          breakTime: true,
          minute: this.state.breakVal,
          second: 0
        })
      }
      else {
         this.setState({
          sessionTime: true,
          breakTime: false,
          minute: this.state.sessionVal,
          second: 0
        })
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
  render() {
    return (
      <div className="Pomodoro">
        <audio id='beep' src='http://www.orangefreesounds.com/wp-content/uploads/2015/04/Loud-alarm-clock-sound.mp3' ref={(audio) => { this.audio = audio}}
        />
        <h3 id="title">Pomodoro Clock</h3>
        {/* Break/Session controlling */}
        <div id="controlTime">
          <div className="break">
            <h5 id="break-label">Break Length</h5>
            <p id="break-length">{this.state.breakVal}</p>
            <button id="break-increment" onClick={() => this.breakClicked("+")}>
              +
            </button>
            <button id="break-decrement" onClick={() => this.breakClicked("-")}>
              -
            </button>
          </div>
          <div className="session">
            <h5 id="session-label">Session Length</h5>
            <p id="session-length">{this.state.sessionVal}</p>
            <button
              id="session-increment"
              onClick={() => this.sessionClicked("+")}
            >
              +
            </button>
            <button
              id="session-decrement"
              onClick={() => this.sessionClicked("-")}
            >
              -
            </button>
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
