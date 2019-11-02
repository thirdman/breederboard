import React, { Component } from "react";
import classNames from "classnames";
import { Box, Text, Chart } from "grommet";

import "./SpeedChart.scss";

class SpeedChart extends Component {
  render() {
    const {
      displayMode = "default",
      children,
      speedData,
      selectedIndex = 0
    } = this.props;
    console.log("speedData", speedData);
    const chartHeight = 160;
    return (
      <React.Fragment>
        {/* <Box
          border="all"
          className={classNames("SpeedChart", displayMode)}
          pad="small"
          fill="horizontal"
          direction="row"
          gap="xxsmall"
          height="100px"
        >
          {speedData &&
            speedData.map((item, index) => (
              <Box
                direction="column"
                align="stretch"
                style={{ flexDirection: "column-reverse" }}
              >
                <Box
                  basis={`${(item.data.perHour / chartHeight) * 100}%`}
                  key={`point${index}`}
                  background="#eee"
                >
                  <Text size="small">{item.data.perHour}</Text>
                </Box>
              </Box>
            ))}
        </Box> */}
        <Box
          fill="horizontal"
          className={classNames("SpeedChart", displayMode)}
        >
          <Box
            className="chartWrap"
            height={`${chartHeight}px`}
            round="small"
            overflow="hidden"
            background="#eee"
          >
            <Box
              className="chartInfo"
              pad="none"
              fill="horizontal"
              direction="row"
              gap="none"
              height={`${chartHeight}px`}
            >
              {speedData &&
                speedData.map((item, index) => (
                  <Box
                    direction="column"
                    align="stretch"
                    style={{ flexDirection: "column-reverse" }}
                    className={classNames(
                      "barItem",
                      selectedIndex === index ? "selected" : ""
                    )}
                  >
                    <Box
                      basis={`${(item.data.perHour / chartHeight) * 100}%`}
                      key={`point${index}`}
                      className="barSpacer"
                    ></Box>
                    <Box className="barLabel">
                      <Text size="xsmall">
                        {parseFloat(item.data.perHour).toFixed(0)} kph
                      </Text>
                    </Box>
                  </Box>
                ))}
            </Box>
            <Box className="chartGraphic">
              <Chart
                className="svgChart"
                fill="horizontal"
                size="small"
                thickness="xsmall"
                type="area"
                width="100%"
                height={`${chartHeight}px`}
                // color="red"
                bounds={[[1, speedData.length], [0, 160]]}
                values={speedData.map((item, index) => {
                  console.log("item", item);
                  return {
                    value: [index + 1, item.data.perHour],
                    label: item.data.perHour
                  };
                })}
                aria-label="chart"
              />
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

export default SpeedChart;
