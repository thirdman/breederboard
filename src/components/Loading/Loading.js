import React, { Component } from "react";
import classNames from "classnames";
import { Nodes } from "grommet-icons";
import { Box } from "grommet";
import "./Loading.scss";

class Loading extends Component {
  render() {
    const {
      displayMode = "default",
      text = "Loading...",
      isActive = true,
      hasMargin = false
    } = this.props;
    return (
      <div
        className={classNames(
          "Loading",
          displayMode,
          isActive ? "isActive" : ""
        )}
      >
        <Box
          direction="row"
          align="center"
          justify="center"
          gap="small"
          margin={hasMargin ? { vertical: "large" } : "none"}
        >
          <Box className="iconWrap" align="center" justify="center">
            <Nodes />
          </Box>
          {text}
        </Box>
      </div>
    );
  }
}

export default Loading;
