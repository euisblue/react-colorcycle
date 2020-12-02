import React, { useState } from 'react';
import './App.css';

interface Props {
  text: string;
}

const App: React.FC<Props> = ({text}) => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  
  return (
    <div className="app">
      {text}
      <div className="palette">
      </div>
    </div>
  )
}

export default App;
