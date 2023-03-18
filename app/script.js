import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';


const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };

  const startTimer = () => {
    setStatus('work');
    setTime(1200);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    setStatus('off')
    setTime(0)
    clearInterval(timer)
  }

  const playBell = () => {
    const audio = new Audio('./sounds/bell.wav')
    audio.play();
  }

  if (time < 0) {

    if (status === 'work') {
      setStatus('rest');
      setTime(20);
      playBell();
    }
    if (status === 'rest') {
      setStatus('work')
      setTime(1200)
      playBell();
    }
  }

  const windowClose = () => {
    close();
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && (<img src="./images/work.png" />)}
      {status === 'rest' && (<img src="./images/rest.png" />)}
      {status !== 'off' && (
        <div className="timer">
          {formatTime(time)}
        </div>
      )}
      {status === 'off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      {status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={windowClose}>X</button>
    </div>
  );
};



render(<App />, document.querySelector('#app'));
