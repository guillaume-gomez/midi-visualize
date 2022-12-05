import { useRef, useEffect } from "react";

export default function useAnimationFrame(callback: Function) {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number| null>(null);
  /**
   * The callback function is automatically passed a timestamp indicating
   * the precise time requestAnimationFrame() was called.
   */
  function animate(time: number) {
    //console.log(time)
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime, time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  function stop() {
    if(requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
      previousTimeRef.current = null;
    }
  }

  function play() {
    if(requestRef.current === null) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }

  return { stop, play };
};