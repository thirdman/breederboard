import React, { Component } from "react";
import classNames from "classnames";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

import "./AssetItem.scss";
import { Box, Button, Heading, Stack, Text } from "grommet";

class AssetItem extends Component {
  render() {
    const {
      asset,
      assetType = "kitty",
      hasShadow = true,
      aspect = "3/3",
      background = "#fff",
      onAssetClick
    } = this.props;
    console.log("asset", asset);
    const tempStyle = {
      //background: background
    };
    const bgStyle = {
      background: background
    };
    return (
      <Box
        className={classNames("AssetItem", assetType)}
        margin="small"
        border="all"
        pad="xsmall"
        elevation={hasShadow ? "xsmall" : false}
        round="xsmall"
        basis="20%"
        animation="slideUp"
        overflow="hidden"
        style={tempStyle}
        onClick={event => this.handleClick(event)}
      >
        <AspectRatio ratio={aspect}>
          <div
            className="imgWrap"
            style={bgStyle}
            onClick={() => onAssetClick(asset && asset.id)}
          >
            <img src={asset.image_url_cdn} className="assetImg" />
          </div>
        </AspectRatio>
        <Heading margin="none" level={6} className="title" truncate>
          {asset.name}
        </Heading>
        <Text margin="none" size={"xsmall"} className="subtitle">
          #{asset.id}
        </Text>
      </Box>
    );
  }
  handleClick = event => {
    event.stopPropagation();
    const { asset, onAssetClick = () => console.error("ggg") } = this.props;
    // console.log(onAssetClick);
    // console.log("typeof", typeof onAssetClick);
    if (asset.id) {
      return onAssetClick(asset.id);
    }
  };
}

export default AssetItem;
