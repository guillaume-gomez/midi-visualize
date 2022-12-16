import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import useAnimationFrame from "../CustomHooks/useAnimationFrame";
import PlayerManagerReducer from "../CustomHooks/usePlayerManager";
import ExternalActionInterface from "../interfaces";
import { Midi } from '@tonejs/midi';

interface MidiCanvasInterface {

}

interface Shape {
  x: number;
  y: number;
  radius: number;
  duration: number;
  elapsedTime: number;
  time: number;
}

const MidiCanvas = forwardRef<ExternalActionInterface, MidiCanvasInterface>(({} , ref ) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(750);
  const [height, setHeight] = useState<number>(750);
  const shapes = useRef<Shape[]>([]);
  const { play, stop } = useAnimationFrame(animate);
  const { midi } = PlayerManagerReducer.useContainer();

  useEffect(() => {
    if(canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if(context) {
        context.clearRect(0, 0, width, height);
      }
    }
    generateCircles();
  }, [midi]);

  useImperativeHandle(ref, () => ({
    play() {
    },

    pause() {
    },

    reset() {
    }
  }));

  function generateCircles() {
    if(midi && shapes.current) {
      midi.tracks.forEach(track => {
        track.notes.forEach((note, index) => {
          const x = width * Math.random();
          const y = height * Math.random();
          const radius = 0.5 * note.velocity;
          const duration = note.duration * 1000; // in millisecond
          const elapsedTime = 0;
          const time = note.time * 1000; // in millisecond

          shapes.current.push({ x, y, radius, duration, elapsedTime, time });
        })
      })
    }
    console.log(shapes.current.map((shape: Shape) => [shape.duration, shape.time]));
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
        if((shape.time >= (time/1000)) && (elapsedTime < duration)) {
          context.beginPath();
          context.arc(x, y, radius * shape.elapsedTime, 0, 2 * Math.PI);
          context.stroke();
          shape.elapsedTime = elapsedTime + deltaTime;
        }
      });
      cleanShapes(time);
    }
  }

  function cleanShapes(time: number) {
    // REMOVE OLD SHAPES
    if(shapes.current) {
      const newShapes = shapes.current.filter((shape :Shape) => shape.time + shape.elapsedTime > shape.duration);
      shapes.current = newShapes;
    }
  }

  function animate(deltaTime: number, time: number) {
    if(canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      draw(deltaTime, time);
    }
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{background: 'grey'}} />
  );
});

export default MidiCanvas;
