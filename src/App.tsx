import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import { Midi } from '@tonejs/midi';
import './App.css';

function App() {
  const ref = useRef<HTMLTextAreaElement>(null);

  function loadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if(event && event.target && event.target.files && ref.current) {
      console.log("jdklfjdklfjkdfjl")
      const file: File = event.target.files[0];
      parseFile(file);
    }
  }

  function parseFile(file : File) {
    //read the file
    const reader = new FileReader();
    reader.onload = function (e) {
      if(!ref.current || !e || !e.target) {
        return;
      }
      const result  = e.target.result as ArrayBuffer;
      console.log(result);
      const midi = new Midi(result);
      ref.current.value = JSON.stringify(midi, undefined, 2);
    };
    reader.readAsArrayBuffer(file);
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
      </header>
    </div>
  );
}

export default App;
