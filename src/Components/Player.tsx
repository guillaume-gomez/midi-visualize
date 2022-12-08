import React, { useEffect, useRef } from 'react';
import PlayerManagerReducer from "../CustomHooks/usePlayerManager";

interface PlayerInterface {

}

function Player( {} : PlayerInterface ) {
  const { filepath } = PlayerManagerReducer.useContainer();
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
      if(filepath === "") {
        return;
      }
      if(ref.current) {
        ref.current.src = `./samples/${filepath}.mp3`;
        ref.current.play();
      }
  }, [ref, filepath]);

  return (
    <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio
            ref={ref}
            controls
            autoPlay={false}
        >
        </audio>
    </figure>
  );
}


export default Player;
