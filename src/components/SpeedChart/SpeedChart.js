import React, { Component } from "react";
import classNames from "classnames";
import { Box, Heading, Text, Chart } from "grommet";
import { parseISO, formatDistanceStrict, format, fromUnixTime } from "date-fns";

import "./SpeedChart.scss";

class SpeedChart extends Component {
  state = {
    hasSelected: true
  };
  render() {
    const {
      displayMode = "default",
      // children,
      speedData
      // selectedIndex = 0
    } = this.props;
    const {
      hasSelected,
      selectedInfo,
      selectedIndex = this.props.selectedIndex
    } = this.state;
    // const [hasSelected, setHasSelected] = useState(true);
    console.log("speedData", speedData);
    const chartHeight = 160;
    const dateNow = new Date();
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
        {speedData && (
          <Box
            fill="horizontal"
            className={classNames(
              "SpeedChart",
              displayMode,
              hasSelected ? "hasSelected" : ""
            )}
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
                      key={`barItem${index}`}
                      direction="column"
                      align="stretch"
                      style={{ flexDirection: "column-reverse" }}
                      className={classNames(
                        "barItem",
                        selectedIndex === index ? "selected" : ""
                      )}
                      onClick={() => this.setInfo(index)}
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
                    // console.log("item", item);
                    return {
                      value: [index + 1, item.data.perHour],
                      label: item.data.perHour
                    };
                  })}
                  aria-label="chart"
                />
              </Box>
            </Box>
            {speedData && (
              <Box className="chartFooter">
                <Box>
                  {speedData &&
                    formatDistanceStrict(
                      fromUnixTime(speedData[0].data.dateCreated.seconds),
                      dateNow
                    )}{" "}
                  ago
                </Box>
                <Box>
                  {speedData &&
                    speedData[12] &&
                    formatDistanceStrict(
                      fromUnixTime(speedData[12].data.dateCreated.seconds),
                      dateNow
                    )}{" "}
                  ago
                </Box>
                <Box>
                  {speedData &&
                    formatDistanceStrict(
                      fromUnixTime(
                        speedData[speedData.length - 1].data.dateCreated.seconds
                      ),
                      dateNow
                    )}{" "}
                  ago
                </Box>
              </Box>
            )}
            {selectedInfo && (
              <Box className={classNames("chartDetail")}>
                <Heading level={4}>Info</Heading>
                {selectedInfo &&
                  format(selectedInfo.selectedDate, "HH:mm")} -{" "}
                {selectedInfo &&
                  formatDistanceStrict(selectedInfo.selectedDate, dateNow)}{" "}
                ago
              </Box>
            )}
          </Box>
        )}
      </React.Fragment>
    );
  }
  setInfo = selectedIndex => {
    console.log("selectedIndex", selectedIndex);
    const { speedData } = this.props;
    let selectedInfo = speedData[selectedIndex].data || {};
    const selectedDate = fromUnixTime(selectedInfo.dateCreated.seconds);
    console.log("selectedDate", selectedDate);
    console.log("formatted:", format(selectedDate, "HH:mm"));
    selectedInfo.selectedDate = selectedDate;
    this.setState({ selectedIndex: selectedIndex, selectedInfo: selectedInfo });
  };
}

export default SpeedChart;
