import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import PlayerManagerReducer from "../CustomHooks/usePlayerManager";
import ExternalActionInterface from "../interfaces";

interface PlayerInterface {

}


const Player = forwardRef<ExternalActionInterface, PlayerInterface>(({} , ref ) => {
  const { filepath } = PlayerManagerReducer.useContainer();
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
      if(filepath === "") {
        return;
      }
      if(audioRef.current) {
        audioRef.current.src = `./samples/${filepath}.mp3`;
        audioRef.current.play();
      }
  }, [audioRef, filepath]);

  useImperativeHandle(ref, () => ({
    play() {
    },

    pause() {
    },

    reset() {
    }
  }));

  return (
    <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio
            ref={audioRef}
            controls
            autoPlay={false}
        >
        </audio>
    </figure>
  );
});


export default Player;
