import React from 'react';
import { timer, filter } from 'rxjs';


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

    }
    startCount() {
        if (!this.timerStatus) {
            var buff_sec = this.seconds;
            var buff_min = this.minutes;
            var buff_hr = this.hours;
            this.timerr = timer(0, 1000)
                .pipe(
                    filter(number => {
                        this.seconds = (number + 1 + buff_sec) % 60;
                        this.setState({
                            currentTime: this.seconds
                        });
                        return true;
                    }),
                    filter(() => {
                        if (this.seconds >= 59) {
                                this.minutes = this.minutes + 1 + buff_min;
                                buff_min = 0;
                            return true;
                        } else {
                            return false;
                        }
                    }),
                    filter(() => {
                        if (this.minutes >= 59) {
                            this.hours = this.hours + 1 + buff_hr;
                            buff_hr = 0;
                            buff_min = 0; // minutes buffer reset
                            this.minutes = 0; // minutes reset
                            return true;
                        } else {
                            return false;
                        }
                    })
                ).subscribe(() => {

                });
            this.timerStatus = true;
        }
        else {
            this.timerStatus = false;
            this.timerr.unsubscribe()
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
        }
    }
    startCountAlt() {

    }
    wait() {
        this.timerStatus = false;
        this.timerr.unsubscribe();
    }
    reset() {
        this.timerStatus = true;
        setTimeout(() => { console.log('stop') }, 1000)
        this.startCount();
        this.startCount();
    }
    render() {
        return (
            <div>
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