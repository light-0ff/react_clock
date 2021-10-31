import React from 'react';
import { Observable, timer } from 'rxjs';


export default class Clock extends React.Component {

    hours = 0;
    minutes = 0;
    seconds = 0;
    timerr = null;
    timerStatus = false;

    constructor(props) {
        super(props);
        this.state = {
            currentTime: null,
        }
        this.startCount = this.startCount.bind(this);
        this.wait = this.wait.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        this.startClock();
    }
    startClock() {
        setInterval(() => {
            let date = new Date();
            this.setState({
                currentTime: (date.toLocaleString()),
            });
        }, 1000)
    }
    startCount() {
        if (!this.timerStatus) {
            var buff_sec = this.seconds;
            var buff_min = this.minutes;
            var buff_hr = this.hours;
            this.timerr = timer(0, 1000).subscribe(number => {
                number % 60 >= buff_sec ? this.seconds = number % 60 : this.seconds = number % 60 + buff_sec;
                Math.floor(number / 60) >= buff_min ? this.minutes = Math.floor(number / 60) : this.minutes = Math.floor(number / 60) + buff_min;
                Math.floor(number / (60 * 60)) >= buff_hr ? this.hours = Math.floor(number / (60 * 60)) : this.minutes = Math.floor(number / (60 * 60)) + buff_hr;
            });
            this.timerStatus = true;
        }
        else {
            this.timerr.unsubscribe()
            this.timerStatus = false;
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
        }
    }
    startCountAlt(){

    }
    wait() {
        this.timerr.unsubscribe();
        this.timerStatus = false;
    }
    reset() {
        this.timerStatus = true;
        this.startCount();
        this.startCount();
    }
    render() {
        return (
            <div>
                <h2>
                    {this.state.currentTime}
                </h2>
                <h1>{this.hours >= 10 ? this.hours : '0' + this.hours}:
                    {this.minutes >= 10 ? this.minutes : '0' + this.minutes}:
                    {this.seconds >= 10 ? this.seconds : '0' + this.seconds}
                </h1>
                <button onClick={this.startCount}>start/ stop</button>
                <button onDoubleClick={this.wait}>wait</button>
                <button onClick={this.reset}>reset</button>
            </div>

        )
    }
}