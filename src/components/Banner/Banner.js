import React from "react";
import "./Banner.scss";

function Banner({
  displayMode = "light",
  content,
  children,
  isHighlighted = false,
  isWide = false,
  isDanger = false,
  hasShadow = false,
  size = "normal", // 'normal', 'small'
  className,
  onClick
}) {
  return (
    <div
      className={`Banner ${displayMode} ${size} ${
        hasShadow ? "hasShadow" : ""
      }`}
    >
      <div className={`bannerBody`}>
        <div className="bannerContent">{children ? children : content}</div>
      </div>
    </div>
  );
}

export default Banner;
