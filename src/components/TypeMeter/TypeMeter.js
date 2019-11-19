import React, { Component } from "react";
// import classNames from "classnames";
import { Box, Meter, Text } from "grommet";
// import { CaretUp, CaretDown } from "grommet-icons";
// import Loading from "../../components/Loading/Loading";
import "./TypeMeter.scss";
// import ckUtils from "../../utils/ck";

class TypeMeter extends Component {
  state = {
    // height: 200,
    isLoading: true
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { displayMode = "default", typeData, limit = 100 } = this.props;
    const { height = 160, isLoading } = this.state;
    const { fancyCount, prestigeCount, normalCount } = typeData;
    // const dateNow = new Date();
    return !isLoading ? (
      <Box
        direction="row"
        gap="small"
        background="#f3f3f3"
        round="xsmall"
        pad="small"
        justify="stretch"
        min-height={`${height}px`}
        fill="horizontal"
      >
        <Meter
          size="xsmall"
          values={[
            {
              value: (fancyCount / limit) * 100,
              label: "Fancy",
              color: "violet",
              onClick: () => {}
            },
            {
              value: (prestigeCount / limit) * 100,
              label: "Prestige",
              color: "#9414cf",
              onClick: () => {}
            },

            {
              value: (normalCount / limit) * 100,
              label: "Normal",
              color: "#ccc",
              onClick: () => {}
            }
          ]}
          type="circle"
          aria-label="meter"
        />
        <Box direction="column" gap="xsmall" align="start" basis="50%">
          <Box direction="row" gap="xsmall">
            <Box round="xsmall" background="violet" width="10px"></Box>
            {fancyCount} Fancy{" "}
            <Text color="#999">
              ({((fancyCount / limit) * 100).toFixed(1)}%)
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Box round="xsmall" background="#9414cf" width="10px"></Box>
            {prestigeCount} Purrstige{" "}
            <Text color="#999">
              ({((prestigeCount / limit) * 100).toFixed(1)}%)
            </Text>
          </Box>
          <Box direction="row" gap="xsmall">
            <Box round="xsmall" background="#ccc" width="10px"></Box>
            {normalCount} Normal{" "}
            <Text color="#999">
              ({((normalCount / limit) * 100).toFixed(1)}%)
            </Text>
          </Box>
        </Box>
      </Box>
    ) : null;
  }
  handleLoad = () => {
    const { typeData, limit = 100 } = this.props;
    if (typeData) {
      this.setState({
        isLoading: false
      });
      return;
    }
  };
}

export default TypeMeter;
