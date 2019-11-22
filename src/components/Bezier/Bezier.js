import React, { useState } from "react";
// import "./MiniStats.scss";

function Bezier(props) {
  // const [showContent, setShowContent] = useState(false);
  const {
    viewBoxWidth,
    viewBoxHeight,
    startPoint,
    firstControlPoint,
    secondControlPoint,
    endPoint,
    stroke = "hotpink",
    fill = "rgba(0,0,0,.2)"
  } = props;

  const fstartPoint = { x: 10, y: 10 };
  const controlPoint = { x: 190, y: 100 };
  const fixedEndPoint = { x: 0, y: 300 };

  const ConnectingLine = ({ from, to }) => (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="violet"
      strokeDasharray="1,1"
      strokeWidth={3}
    />
  );
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      // ref={node => (this.node = node)}
    >
      <ConnectingLine from={controlPoint} to={fixedEndPoint} />
      <path
        d={`
          M ${startPoint}
          C ${firstControlPoint}
            ${secondControlPoint}
            ${endPoint}
          L ${viewBoxWidth},${viewBoxHeight}
          L 0,${viewBoxHeight}
        `}
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
      />
    </svg>
  );
}

export default Bezier;
