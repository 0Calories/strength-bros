import React from "react";
import Sky from "./Sky";
import Ground from "./Ground";
import Player from "./Player";

const Canvas = () => {
  const viewBox = [
    window.innerWidth / -2,
    100 - window.innerHeight,
    window.innerWidth,
    window.innerHeight
  ];
  return (
    <svg
      id="strength-bros-game-canvas"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
    >
      <Sky />
      <Ground />
      <Player />
    </svg>
  );
};

export default Canvas;
