import './Home.scss'
import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div className="present">
        <h2 className="heading"  ><u>To-Do-List</u></h2>
        <h2 className="date">{this.state.date.toLocaleDateString()}</h2>
        <h2 className="time"> {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

  export default Clock;