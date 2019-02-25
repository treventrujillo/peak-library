import React, { Component } from 'react';

import Controls from './Controls';
import Track from './Track';

class TrackPlayer extends Component {
    state = {
        playStatus: 'play',
        currentTime: 0
    }

      togglePlay = () => {
          let status = this.state.playStatus;
          let audio = document.getElementById('audio')
          if (status === 'play') {
              status = 'pause'; audio.play();
          }
          else {
              status = 'play'; audio.pause();
          }
          this.setState({ playStatus: status });
      }

    render() {
        return (
            <div>
                {/* <div className="Header"><div className="Title">Now playing</div></div>
                <Controls isPlaying={this.state.playStatus} togglePlay={this.togglePlay} />
                <audio id='audio'><source src={this.props.track.source} /></audio> */}
            </div>
        );
    }
}

export default TrackPlayer;