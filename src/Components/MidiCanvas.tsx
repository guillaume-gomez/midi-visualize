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
      midi.tracks.forEach(track => {
        track.notes.forEach((note, index) => {
          const x = width * Math.random();
          const y = height * Math.random();
          const radius = 10 * note.velocity;
          const duration = note.duration * 1000;
          const elapsedTime = 0;
          const time = note.time * 1000;

          shapes.current.push({ x, y, radius, duration, elapsedTime, time });
        })
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
          shape.elapsedTime = elapsedTime + deltaTime;
          console.log(shape)
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

/*  function play() {
    if (playing && currentMidi) {
    const now = Tone.now() + 0.1;

    // console.log(currentMidi.tracks);
    currentMidi.tracks.forEach((track, i) => {
      if (i !== 0) return
      let sampleName = track.instrument.name + "_SAMPLE";
      let synth = new Tone.Sampler(
        { G4: sampleName + ".wav" },
        {
          attack: 0.02,
          decay: 50,
          sustain: 50,
          release: 50,
          baseUrl: "https://vfwdz.csb.app/Samples/",
          onload: () => makeLoop()
        }
      ).toMaster();

      const makeLoop = () => {
      //TODO
      const repeatTimes = {
        LEAD: "16m"
      }

      console.log(track.instrument.name)

      let lt = repeatTimes[track.instrument.name]
        // //schedule all of the events
        var loop = new Tone.Loop(function(looptime) {
          track.notes.forEach(note => {
            synth.triggerAttackRelease(
              note.name,
              note.duration,
              note.time + looptime,
              note.velocity
            );
          });
        }, lt).start(lt);

        loops.push(loop);
      };

      synths.push(synth);
      Tone.Transport.start();
    });
  }*/


  function animate(deltaTime: number, time: number) {
    if(canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      draw(deltaTime, time);
    }
  }

  return (
    <canvas ref={canvasRef} width={width} height={height} style={{background: 'grey'}} />
  );
}

export default MidiCanvas;
