import React, { Component } from "react";
import classNames from "classnames";

import "./Swatch.scss";

class Swatch extends Component {
  render() {
    const {
      from = "#ccc",
      to,
      displayMode = "swatch",
      isSelected = false
    } = this.props;
    const tempStyle = {
      background: "pink",
      backgroundImage: `linear-gradient(135deg, ${from}, ${to || from})`
    };
    return (
      <div
        className={classNames(
          "Swatch",
          displayMode,
          isSelected ? "isSelected" : ""
        )}
        style={tempStyle}
      />
    );
  }
}

export default Swatch;
