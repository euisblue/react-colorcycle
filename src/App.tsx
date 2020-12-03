import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  let [red, setRed] = useState(0);
  let [green, setGreen] = useState(0);
  let [blue, setBlue] = useState(0);

  const [boundRed, setBoundRed] = useState(5);
  const [boundGreen, setBoundGreen] = useState(7);
  const [boundBlue, setBoundBlue] = useState(15);

  let [start, setStart] = useState(false);
  

  let interval: any = null;

  function handleColorChange() {
    const paletteDiv = document.getElementById('palette');
    if (paletteDiv !== null) {
      paletteDiv.style.backgroundColor = `rgb(${red},${green},${blue})`;
    }

    if (red > 255) red = 0;
    if (green > 255) green = 0;
    if (blue > 255) blue = 0;

    red = red + boundRed;
    setRed(red);
    green = green + boundGreen;
    setGreen(green);
    blue = blue + boundBlue;
    setBlue(blue);
    console.log(`${red}, ${green}, ${blue}`)
  }
  function handleChange() {
    start = !start;
    setStart(start);
    console.log(`start: ${start}`)

    if (start === true) {
      interval = setInterval(handleColorChange, 250);
    } else {
      clearInterval(interval);
    }
  }

  return (
    <div className="app">
      <button id="startstop" type="button" onClick={handleChange}>
        {(start === true) ? 'Stop' : 'Start'}
      </button>
      <div id="palette">
      </div>
    </div>
  )
}

export default App;
