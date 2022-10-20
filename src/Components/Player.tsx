import React, { useEffect, useRef } from 'react';

interface PlayerInterface {
  filepath: string;
}

function Player({filepath} : PlayerInterface ) {
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
        >
        </audio>
    </figure>
  );
}


export default Player;
