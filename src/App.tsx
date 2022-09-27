import React, { useRef, useState, useEffect } from 'react';
import { Midi } from '@tonejs/midi';
import MidiCanvas from "./Components/MidiCanvas";
import './App.css';

function App() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [midi, setMidi] = useState<Midi>();

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

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={loadImage} />
        <textarea ref={ref}/>
        { !midi ?
          <p>Loading...</p> :
          <MidiCanvas midi={midi} />
        }
      </header>
    </div>
  );
}

export default App;
