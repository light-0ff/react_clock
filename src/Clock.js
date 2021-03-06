import React from 'react';
import { timer } from 'rxjs';


export default class Clock extends React.Component {

    hours = 0;
    minutes = 59;
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
        // this.startClock();

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
                this.setState({
                    currentTime: number,
                });
                console.log(number);
                this.seconds = (number + 1 + buff_sec) % 60;
                this.minutes = buff_min + Math.floor((this.seconds) / 60);
                this.hours = buff_hr + Math.floor(this.minutes / 60);
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
                    {/* {this.state.currentTime} */}
                </h2>
                <h1>
                    {this.hours >= 10 ? this.hours : '0' + this.hours}:
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