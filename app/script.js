import React, { useState } from 'react';
import { render } from 'react-dom';

const App = () => {
  const status2 = {
    status: 'work',
    status: 'rest',
    status: 'off',
  }

  const [status, setStatus] = useState('status2.off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60));
    const seconds = String(Math.floor(time % 60));
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  }

  const startTimer = () => {
    setStatus(status2.work);
    setTime(1200);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    setStatus('status2.off')
    setTime(0)
    clearInterval(timer)
  }

  const playBell = () => {
    const audio = new Audio('./sounds/bell.wav')
    audio.play();
  }

  if (time < 0) {

    if (status === status2.work) {
      setStatus('status2.rest');
      setTime(20);
      playBell();
    }
    if (status === 'status2.rest') {
      setStatus(status2.work)
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
      {status === 'status2.off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === status2.work && (<img src="./images/work.png" />)}
      {status === 'status2.rest' && (<img src="./images/rest.png" />)}
      {status !== 'status2.off' && (
        <div className="timer">
          {formatTime(time)}
        </div>
      )}
      {status === 'status2.off' && (<button className="btn" onClick={startTimer}>Start</button>)}
      {status !== 'status2.off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={windowClose}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
