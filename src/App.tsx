import React, { useRef, useState, useEffect } from 'react';
import MidiCanvas from "./Components/MidiCanvas";
import Player from "./Components/Player";
import './App.css';
import { Midi } from "@tonejs/midi";

function App() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [midi, setMidi] = useState<Midi>();
  const [filepath, setFilepath] = useState<string>("");

  function loadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if(event && event.target && event.target.files && ref.current) {
      const file: File = event.target.files[0];
      
      const [filename, _fileExtention] = file.name.split(".");
      setFilepath(filename);
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

  function playMidiFile() {
   
    //player.start();
    //player.stop();

  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={loadImage} />
        <textarea ref={ref}/>
        <Player filepath={filepath} />
        { !midi ?
          <p>Loading...</p> :
          <MidiCanvas midi={midi} />
        }
      </header>
    </div>
  );
}

export default App;
