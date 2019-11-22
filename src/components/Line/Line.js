import React, { useState } from "react";
// import "./MiniStats.scss";

function Line(props) {
  // const [showContent, setShowContent] = useState(false);
  const {
    viewBoxWidth = 300,
    viewBoxHeight = 300,
    startPoint = { x: 50, y: 50 },
    endPoint = { x: 0, y: 300 },
    stroke = "red",
    dashArray = "1,0",
    strokeWidth = 2,
    dotSize = 5
  } = props;

  // const startPoint = { x: 10, y: 10 };
  const controlPoint = { x: 190, y: 100 };
  // const endPoint = { x: 0, y: 300 };

  const ConnectingLine = ({ from, to }) => (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={stroke}
      strokeDasharray={dashArray}
    />
  );
  const LargeHandle = ({ coordinates, onMouseDown }) => (
    <ellipse
      cx={coordinates.x}
      cy={coordinates.y}
      rx={dotSize}
      ry={dotSize}
      fill="rgb(244, 0, 137)"
      onMouseDown={onMouseDown}
      style={{ cursor: "-webkit-grab" }}
    />
  );
  return (
    <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
      <ConnectingLine from={startPoint} to={endPoint} stroke={stroke} />
      <LargeHandle coordinates={endPoint} />
    </svg>
  );
}

export default Line;
