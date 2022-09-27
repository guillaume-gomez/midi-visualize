import React, { useRef, useState, useEffect } from 'react';
import useAnimationFrame from "../CustomHooks/useAnimationFrame";
import { Midi } from '@tonejs/midi';

interface MidiCanvasInterface {
  midi: Midi;
}

interface Shape {
  x: number;
  y: number;
  radius: number;
  duration: number;
  elapsedTime: number;
  time: number;
}

function MidiCanvas({midi} : MidiCanvasInterface ) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(750);
  const [height, setHeight] = useState<number>(750);
  const shapes = useRef<Shape[]>([]);
  const { play, stop } = useAnimationFrame(animate);

  useEffect(() => {
    if(canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if(context) {
        context.clearRect(0, 0, width, height);
      }
    }
    generateCircles();
  }, [midi]);

  function generateCircles() {
    if(midi && shapes.current) {
      midi.tracks[0].notes.forEach(note => {
        const x = width * Math.random();
        const y = height * Math.random();
        const radius = 10 * note.velocity;
        const duration = note.duration;
        const elapsedTime = 0;
        const time = note.time;

        shapes.current.push({ x, y, radius, duration, elapsedTime, time });
      })
    }
  }

  function draw(deltaTime: number, time: number) {
    if(canvasRef.current && shapes.current) {
      const context = canvasRef.current.getContext('2d');
      if(!context) {
        return;
      }

      context.clearRect(0, 0, width, height);

      shapes.current.forEach((shape) => {
        const {x, y, radius, duration, elapsedTime} = shape;
        if((shape.time >= (time/1000) ) && (elapsedTime < duration)) {
          context.beginPath();
          context.arc(x, y, radius * (time/1000), 0, 2 * Math.PI);
          context.stroke();
          shape.elapsedTime = elapsedTime + (deltaTime/1000);
          console.log(shape)
        }
      });
      cleanShapes();
    }
  }

  function cleanShapes() {
    // REMOVE OLD SHAPES
  }


  function animate(deltaTime: number, time: number) {
    if(canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      draw(deltaTime, time);
    }
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{background: 'red'}} />
  );
}

export default MidiCanvas;
