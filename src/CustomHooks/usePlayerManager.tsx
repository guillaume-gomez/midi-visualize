import { useState, useEffect } from "react";
import { createContainer } from "unstated-next";
import { Midi } from "@tonejs/midi";

const initialState = {}

function usePlayerManager(state = initialState) {
  const [play, setPlay] = useState<boolean>(false);
  const [midi, setMidi] = useState<Midi>();
  const [filepath, setFilepath] = useState<string>("");

  function playFunction() {
    setPlay(true);
  }

  function pause() {
    setPlay(false);
  }

  return {
    play: playFunction,
    pause,
    midi,
    filepath,
    setMidi,
    setFilepath
  }
}

export default createContainer(usePlayerManager);