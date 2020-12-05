import React, { useState } from 'react';
import './App.scss';

interface RGBButton {
  color: string,
  setColorIncrement: any
}

const ColorButton: React.FC<RGBButton> = (RGB) => {
  return (
    <div>
      <input type="number"
        name={RGB.color}
        id={`${RGB.color}Input`}
        min={0}
        max={255}
        defaultValue={5}
        onChange={(e) => {
          let v = Number(e.target.value);
          if(v>255) e.target.value = String(v-255);
          e.target.value = String(Math.abs(Number(e.target.value)));
          
          if (RGB.color === 'red') {
            RGB.setColorIncrement(Number(e.target.value));
          } else if (RGB.color === 'green') {
            RGB.setColorIncrement(Number(e.target.value));
          } else {
            RGB.setColorIncrement(Number(e.target.value));
          }
        }}
      />
    </div>
  )
}

const App: React.FC = () => {
  let [red, setRed] = useState(0);
  let [green, setGreen] = useState(0);
  let [blue, setBlue] = useState(0);

  const [boundRed, setBoundRed] = useState(5);
  const [boundGreen, setBoundGreen] = useState(5);
  const [boundBlue, setBoundBlue] = useState(5);

  const [start, setStart] = useState(false);
  const [myInterval, setMyInterval]: any = useState(undefined);

  let [hexStr, setHexStr] = useState('');

  function handleColorChange() {
    const paletteDiv = document.getElementById('palette');
    if (paletteDiv !== null) {
      paletteDiv.style.backgroundColor = `rgb(${red},${green},${blue})`;
    }

    red += boundRed;
    setRed(red);
    green += boundGreen;
    setGreen(green);
    blue += boundBlue;
    setBlue(blue);

    hexStr = rgbToHex(red - boundRed, green - boundGreen, blue - boundBlue);
    setHexStr(hexStr);

    if (red > 255) { red -= 255; setRed(red); }
    if (green > 255) { green -= 255; setGreen(green); }
    if (blue > 255) { blue -= 255; setBlue(blue); }
  }

  function handleChange() {
    if (start === false) {
      setMyInterval(setInterval(handleColorChange, 250));
      setStart(true);
    } else {
      clearInterval(myInterval);
      setStart(false);
    }
  }

  function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function complementaryColor(color: string) {
    const hexColor: any = hexStr.replace('#', '0x');
    const base: any = '0xffffff'
    return `#${('000000' + ((base ^ hexColor).toString(16))).slice(-6)}`;
  }

  function rgbToHex(r: number, g: number, b: number) {
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;

    if (r > 255) r -= 255;
    if (g > 255) g -= 255;
    if (b > 255) b -= 255;

    const hexDiv: HTMLElement | null = document.getElementById('hexfield');
    let hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    if (hexDiv) hexDiv.style.color = complementaryColor(hex);
    return hex;
  }

  return (
    <div className="app">
      <div id="palette">
        <div id="hexfield">
          {hexStr}
        </div>
      </div>
      <button id="startstop" type="button" onClick={handleChange}>
        {start ? 'Stop' : 'Start'}
      </button>
      <div id="colorIncrement">
        Red:
        <ColorButton color={"red"} setColorIncrement={setBoundRed} />
        Green:
        <ColorButton color={"green"} setColorIncrement={setBoundGreen} />
        Blue:
        <ColorButton color={"blue"} setColorIncrement={setBoundBlue} />
      </div>
    </div>
  )
}

export default App;
