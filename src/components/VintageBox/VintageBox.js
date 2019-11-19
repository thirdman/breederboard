import React, { Component } from "react";
// import classNames from "classnames";
import { Box, Meter, Button, Text, Heading } from "grommet";
import { CaretUp, CaretDown } from "grommet-icons";
// import Loading from "../../components/Loading/Loading";
import "./VintageBox.scss";
// import ckUtils from "../../utils/ck";

class VintageBox extends Component {
  state = {
    // height: 200,
    isLoading: true,
    showDetail: false
  };
  componentDidMount() {
    this.handleLoad();
  }
  render() {
    const { displayMode = "default", vintageData, limit = 100 } = this.props;
    const { height = 160, isLoading, showDetail } = this.state;
    const { vintageScore, vintageArray } = vintageData;
    // const dateNow = new Date();
    return !isLoading ? (
      <React.Fragment>
        <Box
          direction="row"
          gap="xxsmall"
          background="#f3f3f3"
          round="xsmall"
          pad="small"
          justify="stretch"
          min-height={`${height}px`}
          fill="horizontal"
        >
          {/* <Meter
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
        /> */}
          <Box direction="column" gap="xsmall" align="start" basis="50%">
            <Heading level={6} margin="none">
              Vintage Kitties
            </Heading>
            <Text size="xxlarge">{vintageArray.length}</Text>
          </Box>
          <Box direction="row" align="start" basis="50%">
            <Box direction="column" gap="xsmall" fill="horizontal">
              <Heading level={6} margin="none">
                Vintage Mojo
              </Heading>
              <Box
                fill="horizontal"
                direction="row"
                gap="xsmall"
                align="center"
                justify="stretch"
                margin={{ vertical: "none" }}
              >
                <Box basis="110px">
                  <Text size="small">Primary</Text>
                </Box>
                <Box
                  className="vintageBar"
                  background="#ddd"
                  fill="horizontal"
                  round="xsmall"
                  overflow="hidden"
                  style={{
                    height: "18px"
                  }}
                  justify="start"
                  gap="small"
                  align="center"
                  direction="row"
                >
                  <Box
                    className="vintageHighlight"
                    background="#aaa"
                    style={{
                      width: this.getPercent(vintageData.primaryScore, limit),
                      height: "18px"
                    }}
                  ></Box>
                  <Text size="small">
                    {this.getPercent(vintageData.primaryScore, limit)}
                  </Text>
                </Box>
              </Box>
              <Box
                fill="horizontal"
                direction="row"
                gap="xsmall"
                align="center"
                justify="stretch"
                margin={{ top: "xxsmall" }}
              >
                <Box basis="110px">
                  <Text size="small">Secondary</Text>
                </Box>
                <Box
                  className="vintageBar"
                  background="#ddd"
                  fill="horizontal"
                  round="xsmall"
                  overflow="hidden"
                  style={{
                    height: "18px"
                  }}
                  justify="start"
                  gap="small"
                  align="center"
                  direction="row"
                >
                  <Box
                    className="vintageHighlight"
                    background="#aaa"
                    style={{
                      width: this.getPercent(vintageData.secondaryScore, limit),
                      height: "18px"
                    }}
                  ></Box>
                  <Text size="small">
                    {this.getPercent(vintageData.secondaryScore, limit)}
                  </Text>
                </Box>
              </Box>
              <Box
                fill="horizontal"
                direction="row"
                gap="xsmall"
                align="center"
                justify="stretch"
                margin={{ top: "xxsmall" }}
              >
                <Box basis="110px">
                  <Text size="small">Tertiary</Text>
                </Box>
                <Box
                  className="vintageBar"
                  background="#ddd"
                  fill="horizontal"
                  round="xsmall"
                  overflow="hidden"
                  style={{
                    height: "18px"
                  }}
                  justify="start"
                  gap="small"
                  align="center"
                  direction="row"
                >
                  <Box
                    className="vintageHighlight"
                    background="#aaa"
                    style={{
                      width: this.getPercent(vintageData.tertiaryScore, limit),
                      height: "18px"
                    }}
                  ></Box>
                  <Text size="small">
                    {this.getPercent(vintageData.tertiaryScore, limit)}
                  </Text>
                </Box>
              </Box>
              <Box
                fill="horizontal"
                direction="row"
                gap="xsmall"
                align="center"
                justify="stretch"
                margin={{ top: "xsmall" }}
              >
                <Box basis="110px">
                  <Text size="small">Eye Color</Text>
                </Box>
                <Box
                  className="vintageBar"
                  background="#ddd"
                  fill="horizontal"
                  round="xsmall"
                  overflow="hidden"
                  style={{
                    height: "18px"
                  }}
                  justify="start"
                  gap="small"
                  align="center"
                  direction="row"
                >
                  <Box
                    className="vintageHighlight"
                    background="#aaa"
                    style={{
                      width: this.getPercent(vintageData.eyesScore, limit),
                      height: "18px"
                    }}
                  ></Box>
                  <Box>
                    <Text size="small">
                      {this.getPercent(vintageData.eyesScore, limit)}
                    </Text>
                  </Box>
                </Box>
              </Box>{" "}
              <Button
                plain
                onClick={() => this.setState({ showDetail: !showDetail })}
              >
                <Box
                  pad={{ vertical: "xxsmall", horizontal: "small" }}
                  border="all"
                  round="medium"
                  direction="row"
                  gap="xxsmall"
                  align="center"
                >
                  {showDetail ? (
                    <CaretUp size="small" color="secondary" />
                  ) : (
                    <CaretDown size="small" color="secondary" />
                  )}
                  <Text size="small">
                    {showDetail ? "Hide Detail" : `Show Detail`}
                  </Text>
                </Box>
              </Button>
            </Box>
            {/* <Box direction="column" gap="xsmall">
              <Heading level={6} margin="none">
                Vintage Factor
              </Heading>
              <Text size="medium">{vintageScore.toFixed(2)}</Text>
            </Box> */}
          </Box>
        </Box>
        {showDetail && (
          <Box
            direction="column"
            gap="xsmall"
            align="start"
            basis="100%"
            fill="horizontal"
          >
            <Box fill="horizontal">
              <Heading level="6" margin="none">
                Primary Color
              </Heading>
              <Box
                className="vintageBar"
                background="#eee"
                fill="horizontal"
                round="xsmall"
                overflow="hidden"
                style={{
                  height: "20px"
                }}
                justify="start"
                gap="small"
                align="center"
                direction="row"
              >
                <Box
                  className="vintageHighlight"
                  background="#aaa"
                  style={{
                    width: this.getPercent(vintageData.primaryScore, limit),
                    height: "20px"
                  }}
                ></Box>
                <Text>{this.getPercent(vintageData.primaryScore, limit)}</Text>
              </Box>
              <Text size="small" color="#999">
                cloudwhite, greymatter, koala, onyx, or shadowgrey
              </Text>
            </Box>
            <Box fill="horizontal">
              <Heading level="6" margin="none">
                Secondary Color
              </Heading>
              <Box
                className="vintageBar"
                background="#eee"
                fill="horizontal"
                round="xsmall"
                overflow="hidden"
                style={{
                  height: "20px"
                }}
                justify="start"
                gap="small"
                align="center"
                direction="row"
              >
                <Box
                  className="vintageHighlight"
                  background="#aaa"
                  style={{
                    width: this.getPercent(vintageData.secondaryScore, limit),
                    height: "20px"
                  }}
                ></Box>
                <Text>
                  {this.getPercent(vintageData.secondaryScore, limit)}
                </Text>
              </Box>
              <Text size="small" color="#999">
                cyborg, egyptiankohl, lilac, pearl, or wolfgrey
              </Text>
            </Box>
            <Box fill="horizontal">
              <Heading level="6" margin="none">
                Tertiary Color
              </Heading>
              <Box
                className="vintageBar"
                background="#eee"
                fill="horizontal"
                round="xsmall"
                overflow="hidden"
                style={{
                  height: "20px"
                }}
                justify="start"
                gap="small"
                align="center"
                direction="row"
              >
                <Box
                  className="vintageHighlight"
                  background="#aaa"
                  style={{
                    width: this.getPercent(vintageData.tertiaryScore, limit),
                    height: "20px"
                  }}
                ></Box>
                <Text>{this.getPercent(vintageData.tertiaryScore, limit)}</Text>
              </Box>
              <Text size="small" color="#999">
                cashewmilk, granitegrey", icy, purplehaze, or shale
              </Text>
            </Box>
            <Box fill="horizontal">
              <Heading level="6" margin="none">
                Eye Color
              </Heading>
              <Box
                className="vintageBar"
                background="#eee"
                fill="horizontal"
                round="xsmall"
                overflow="hidden"
                style={{
                  height: "20px"
                }}
                justify="start"
                gap="small"
                align="center"
                direction="row"
              >
                <Box
                  className="vintageHighlight"
                  background="#aaa"
                  style={{
                    width: this.getPercent(vintageData.eyesScore, limit),
                    height: "20px"
                  }}
                ></Box>
                <Box>
                  <Text>{this.getPercent(vintageData.eyesScore, limit)}</Text>
                </Box>
              </Box>
              <Text size="small" color="#999">
                eclipse or thundergrey
              </Text>
            </Box>
          </Box>
        )}
      </React.Fragment>
    ) : null;
  }
  handleLoad = () => {
    const { vintageData, limit = 100 } = this.props;
    if (vintageData) {
      this.setState({
        isLoading: false
      });
      return;
    }
  };
  getPercent = (amount, limit) => {
    const percent = ((amount / limit) * 100).toFixed(1);
    const percentString = `${percent}%`;
    return percentString;
  };
}

export default VintageBox;
