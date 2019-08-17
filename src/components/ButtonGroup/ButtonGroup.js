import React, { Component } from "react";
import classNames from "classnames";

import "./ButtonGroup.scss";

class ButtonGroup extends Component {
  render() {
    const { displayMode = "default", children } = this.props;

    return (
      <div className={classNames("ButtonGroup", displayMode)}>{children}</div>
    );
  }
}

export default ButtonGroup;
