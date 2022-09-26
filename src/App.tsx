import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import { Midi } from '@tonejs/midi';
import './App.css';

function App() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [midi, setMidi] = useState<Midi>();
  const [width, setWidth] = useState<number>(750);
  const [height, setHeight] = useState<number>(750);

  useEffect(() => {
    if(refCanvas.current) {
      const context = refCanvas.current.getContext('2d');
      if(context) {
        context.clearRect(0, 0, width, height);
      }
    }
    generateCircles();
  }, [midi])

  function loadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if(event && event.target && event.target.files && ref.current) {
      const file: File = event.target.files[0];
      parseFile(file);
    }
  }

  function parseFile(file: File) {
    //read the file
    const reader = new FileReader();
    reader.onload = function (e) {
      if(!ref.current || !e || !e.target) {
        return;
      }
      const result  = e.target.result as ArrayBuffer;
      const midi = new Midi(result);
      setMidi(midi);
      ref.current.value = JSON.stringify(midi, undefined, 2);
    };
    reader.readAsArrayBuffer(file);
  }

  function generateCircles() {
    if(refCanvas.current && midi) {
      const context = refCanvas.current.getContext('2d');
      if(!context) {
        return;
      }
      midi.tracks[0].notes.forEach(note => {
        const x = width * Math.random();
        const y = height * Math.random();
        const radius = 50 * note.velocity;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.stroke();

      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="file" onChange={loadImage} />
        <textarea ref={ref}/>
        <canvas ref={refCanvas} width={width} height={height} style={{background: 'red'}} />
      </header>
    </div>
  );
}

export default App;
