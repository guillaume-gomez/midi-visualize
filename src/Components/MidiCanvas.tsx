import React, { useRef, useState, useEffect } from 'react';
import { Midi } from '@tonejs/midi';

interface MidiCanvasInterface {
  midi: Midi;
}

function MidiCanvas({midi} : MidiCanvasInterface ) {
  const refCanvas = useRef<HTMLCanvasElement>(null);
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
  }, [midi]);

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
    <canvas ref={refCanvas} width={width} height={height} style={{background: 'red'}} />
  );
}

export default MidiCanvas;
