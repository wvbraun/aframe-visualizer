import 'aframe';
import 'aframe-animation-component';
import 'aframe-layout-component';
import 'aframe-particle-system-component';
import 'aframe-entity-generator-component';
import './aframe-frequency-bars-component';
import './aframe-key-events-component';
import './aframe-audioanalyser-component';
import './aframe-audioanalyser-levels-scale';
import 'babel-polyfill';
import { Entity, Scene } from 'aframe-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const STATES = [
  'ENDED',
  'PLAYING',
  'PAUSED',
  'BUFFERING'
];

const OPTIONS_ANALYSER = {
  smoothingTime: 0.6,
  fftSize: 512,
  minDecibels: -140,
  maxDecibels: 0,
};

const OPTIONS_DEFAULT = {
  autoplay: false,
  shadowBlur: 60, //20,
  shadowColor: '#ffffff',
  barColor: '#c3383b' /* '#cafdff' */,
  barWidth: 2,
  barHeight: 2,
  barSpacing: 7,
  font: ['12px', 'Helvetica'],
  textColor: 'rgba(100%, 100%, 100%, 0.8)',
  altColor: 'rgba(100%, 100%, 100%, 0.1)',
};

const secondsToTime = (seconds) => {
  const ms = 1000 * seconds
  return new Date(ms).toISOString().substr(14, 5);
}

class Visualizer extends Component {
    constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      ctx: null,
      analyser: null,
      frequencyData: null,
      sourceNode: null,
      levels: null,
      waveform: null,
      gradient: {
        foregoundGradient: null,
        backgroundGradient: null,
      },
      canvasCtx: {
        foregroundCtx: null,
        particleCtx: null,
        backgroundCtx: null,
      },
      interval: null,
      duration: null,
      options: OPTIONS_DEFAULT,
      extensions: {},
      model: null,
      progress: 0,
      particles: [],
    };
  }

  componentWillMount () {
    //window.addEventListener('resize', this._onResize, true);
    //this._setContext();
    /*
    .then(() => {
      this._setAnalyser();
    }).then(() => {
      this._setFrequencyData();
    }).catch((error) => {
      this._onDisplayError(error);
    });
    */
  }

  componentDidMount () {
    this._extend().then(() => {
      this.state.options.autoplay && this._onResolvePlayState();
    }).catch((error) => {
      this._onDisplayError(error);
    });
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.model !== nextProps.model) {
      this._onAudioStop().then(() => {
        this.setState({ model: nextProps.model }, () => {
          this.componentDidMount();
        });
      });
    }
  }

  componentWillUnmount () {
    //this.state.ctx.close();
  }

  _onDisplayError = (error) => {
    return window.console.table(error);
  }

  _extend = () => {
    const options = Object.assign(OPTIONS_DEFAULT, this.props.options);
    const extensions = Object.assign({}, this.props.extensions || {
      renderStyle: this._onRenderStyleDefault,
      renderText: this._onRenderTextDefault,
      renderTime: this._onRenderTimeDefault
    });

    return new Promise((resolve, reject) => {
      this.setState({
        options,
        model: this.props.model,
        extensions
      }, () => {
        return resolve();
      });
    });
  }

  _setCanvasContext = () => {
    const canvasCtx = {
      foregroundCtx: this.foregroundCanvas.getContext('2d'),
      particleCtx: this.particleCanvas.getContext('2d'),
      backgroundCtx: this.backgroundCanvas.getContext('2d'),
    };

    return new Promise((resolve, reject) => {
      this.setState({ canvasCtx }, () => {
        return resolve();
      });
    });
  }

  _setContext = () => {
    const error = { message: 'Web Audio API is not supported.' };

    return new Promise((resolve, reject) => {
      try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.setState({ ctx: new window.AudioContext() }, () => {
          return resolve();
        });
      } catch (e) {
          return reject(error);
      }
    });
  }

  _setAnalyser = () => {
    const { ctx } = this.state;

    return new Promise((resolve, reject) => {
      let analyser = ctx.createAnalyser();

      analyser.smoothingTimeConstant = OPTIONS_ANALYSER.smoothingTime;
      analyser.fftSize = OPTIONS_ANALYSER.fftSize;
      analyser.minDecibels = OPTIONS_ANALYSER.minDecibels;
      analyser.maxDecibels = OPTIONS_ANALYSER.maxDecibels;

      this.setState({
        analyser,
        waveform: analyser.fftSize,
      }, () => {
        return resolve();
      });
    });
  }

  _setFrequencyData = () => {
    const { analyser } = this.state;

    return new Promise((resolve, reject) => {
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);

      this.setState({
        frequencyData,
        levels: frequencyData,
      }, () => {
        return resolve();
      });
    });
  }

  _setSourceNode = () => {
    const { audio } = this;
    const { ctx, analyser } = this.state;

    return new Promise((resolve, reject) => {
      let sourceNode = ctx.createMediaElementSource(audio);
      sourceNode.connect(analyser);
      sourceNode.connect(ctx.destination);
      sourceNode.onended = () => {
        this._onAudioStop();
      };

      this.setState({ sourceNode }, () => {
        return resolve();
      });
    });
  }

  _onChange = (state) => {
    const { onChange } = this.props;

    return onChange && onChange.call(this, { status: state });
  }

  _onResolvePlayState = () => {
    const { isPlaying } = this.state;

    if (!isPlaying) {
      return this._onAudioPlay();
    } else {
      return this._onAudioPause();
    }
  }

  _onAudioPause = () => {
    this.setState({ isPlaying: false }, () => {
      this.audio.pause();
    });

    return this;
  }

  _onAudioStop = () => {
    return new Promise((resolve, reject) => {
      this.setState({ isPlaying: false, }, () => {
        return resolve();
      });
    });
  }

  _onAudioPlay = () => {
    this.setState({ isPlaying: true }, () => {
      this.audio.play();
      //this._onRenderFrame();
    });

    return this;
  }

  _onKeyDown = (evt) => {
    if (evt.detail.key === ' ') {
      this._onResolvePlayState();
    }
  }

  render () {
    const { progress, frequencyData, options } = this.state;
    const { model } = this.props;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const events = {
      keydown: this._onKeyDown,
      // click: this._onResolvePlayState,
    };
    // scale-y-color="from: 20 10 10; to: 195 56 590; maxScale: 15">
    return (
      <Scene>
        <a-assets>
          <a-mixin
            id="bar"
            geometry="primitive: box"
            material="color: red"
          ></a-mixin>
          <audio
            id="audio"
            ref={el => this.audio = el}
            className='visualizer__audio'
            src={model.src}
            crossOrigin="anonymous"
          ></audio>
        </a-assets>

        <Entity particle-system={{preset: 'snow', particleCount: 2000}}/>

        <Entity
          audioanalyser="src: #audio; smoothingTimeConstant: 0.9"
          audioanalyser-levels-scale="max: 50; multiplier: 0.06"
          frequency-bars="mixin: bar"
          layout="type: circle; radius: 15"
          rotation="90 180 0"
        />

        <Entity primitive="a-light" type="ambient" color="#222"/>

        <Entity
          primitive="a-light"
          type="point"
          intensity="2"
          position="0 1 0"
        />

        <Entity primitive='a-sky' color='#222' />

        <Entity
          id='ground'
          primitive='a-circle'
          color='#333'
          opacity='0.8'
          rotation='-90 0 0'
          radius='30'
          roughness='1'
        />
      </Scene>
    );
  }
}

Visualizer.propTypes = {
  model: PropTypes.object.isRequired,
  options: PropTypes.object,
  className: PropTypes.string,
  extensions: PropTypes.object,
  onChange: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Visualizer;
