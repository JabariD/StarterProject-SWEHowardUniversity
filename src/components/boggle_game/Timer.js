import React, { Component } from 'react'



export class Timer extends Component {
    constructor() {
        super();
        this.state = {
            clock: 180 // in seconds (3 minutes)
        };
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
          const { clock } = this.state
          if (clock > 0) {
            this.setState(({ clock }) => ({
              clock: clock - 1
            }))
          }

          if (clock === 0) {
            clearInterval(this.myInterval);
            this.props.updateGameState();
          }
        }, 1000)
      }

    render() {
        return (
            <div>
                {this.state.clock}s
            </div>
        )
    }
}

export default Timer
