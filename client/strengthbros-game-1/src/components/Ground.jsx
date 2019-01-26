import React from "react";

const Ground = () => {
  const groundStyle = {
    fill: "#59a941"
  };
  const division = {
    stroke: "#458232",
    strokeWidth: "3px"
  };

  const groundWidth = 5000;
  const groundPosition = -450;

  return (
    <g id="ground">
      <rect
        id="ground-2"
        data-name="ground"
        style={groundStyle}
        x={groundWidth / -2}
        y={groundPosition}
        width={groundWidth}
        height={1000}
        transform="rotate(20, 0, 0)"
      />
      <line
        x1={groundWidth / -2}
        y1={groundPosition}
        x2={groundWidth / 2}
        y2={groundPosition}
        style={division}
        transform="rotate(20, 0, 0)"
      />
    </g>
  );
};

export default Ground;
