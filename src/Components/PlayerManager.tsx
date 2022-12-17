import React, { useRef } from 'react';
import MidiCanvas from "./MidiCanvas";
import { Midi } from "@tonejs/midi";
import Player from "./Player";
import PlayerManagerReducer from "../CustomHooks/usePlayerManager";

function PlayerManager() {
  const { setMidi, setFilepath, couldPlay } = PlayerManagerReducer.useContainer();
  const ref = useRef<HTMLTextAreaElement>(null);

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

  return (
    <>
      <input type="file" onChange={loadImage} />
      <textarea ref={ref}/>
      <button disabled={!couldPlay}>
        {couldPlay ? "Play" : "Pause"}
      </button>
      <div>
        <Player />
        <MidiCanvas />
      </div>
    </>
  );
}

export default PlayerManager;
