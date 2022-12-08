import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { Midi } from "@tonejs/midi";

const initialState = {}

function usePlayerManager(state = initialState) {
  const [play, setPlay] = useState<boolean>(false);
  const [couldPlay, setCouldPlay] = useState<boolean>(false);
  const [midi, setMidi] = useState<Midi>();
  const [filepath, setFilepath] = useState<string>("");

  function playFunction() {
    setPlay(true);
  }

  function pause() {
    setPlay(false);
  }

  function couldPlayFunction(midi: Midi, filepath: string) {
    setCouldPlay(filepath !== "" && !!midi);
  }

  function setMidiFunction(value: Midi) {
    setMidi(value);
    if(value) {
      couldPlayFunction(value, filepath);
    }
  }

  function setFilepathFunction(value: string) {
    setFilepath(value);
    if(midi) {
      couldPlayFunction(midi, value);
    }
  }

  return {
    play: playFunction,
    pause,
    midi,
    filepath,
    setMidi: setMidiFunction,
    setFilepath: setFilepathFunction,
    couldPlay
  }
}

export default createContainer(usePlayerManager);