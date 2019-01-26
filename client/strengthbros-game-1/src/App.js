import React from "react";

const Canvas = () => {
  const viewBox = [
    window.innerWidth / -2,
    100 - window.innerHeight,
    window.innerWidth,
    window.innerHeight
  ];
  return (
    <svg
      id="strengthbros-game-1-canvas"
      preserveAspectRatio="xMaxYMax none"
      viewBox={viewBox}
    >
      <circle cx={0} cy={0} r={50} />
    </svg>
  );
};

export default Canvas;
