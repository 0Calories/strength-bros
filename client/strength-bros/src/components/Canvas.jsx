import React from "react";

import randomColor from "randomcolor";

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
    <svg id="strength-bros-game-canvas" viewBox={viewBox}>
      <Sky />
      <Ground />
      <Player position={0} color={randomColor()} />
    </svg>
  );
};

export default Canvas;
