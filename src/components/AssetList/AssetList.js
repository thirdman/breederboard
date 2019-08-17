import React, { Component } from "react";
import classNames from "classnames";

import "./AssetList.scss";
import AssetItem from "./../AssetItem/AssetItem";

import { Box, Button, Menu, Text } from "grommet";

class AssetList extends Component {
  state = { collectionName: "" };
  render() {
    const {
      assets,
      collections,
      assetType = "kitty",
      hasInfo = true,
      // hasFilters = true,
      selectedCollection,
      onAssetClick = () => console.log("ggg")
      // onSelectCollection,
      // showAllAssets = () => console.log("nope")
    } = this.props;
    const { collectionName } = this.state;
    return (
      <Box
        direction="column"
        alignItems="start"
        align="start"
        className={classNames("AssetList")}
        padding="small"
        wrap
        fill="horizontal"
        justify="start"
        // gap="small"
      >
        <Box
          align="center"
          pad="small"
          border="bottom"
          fill="horizontal"
          direction="row"
          justify="between"
        >
          <Box direction="row" align="center" justify="center" gap="small">
            {hasInfo && (
              <Box
                pad="small"
                direction="row"
                align="center"
                justify="center"
                gap="small"
              >
                <Text as="span">Kitties:</Text>
                <Text as="span" weight={900}>
                  {assets.length || "..."}
                </Text>
              </Box>
            )}
            {collections && collections.length > 0 && (
              <Box
                pad="small"
                direction="row"
                align="center"
                justify="center"
                gap="small"
              >
                <Text as="span">Collections:</Text>
                <Text as="span" weight={900}>
                  {collections.length || "..."}
                </Text>
              </Box>
            )}
          </Box>
          <Box direction="row" align="center" justify="center" gap="small">
            {collections && collections.length > 0 && (
              <React.Fragment>
                <Text>Collection: </Text>
                <Menu
                  label={(selectedCollection && collectionName) || "Select"}
                  items={collections.map(collection => {
                    const thisObj = {
                      label: collection.name || "ggg",
                      onClick: () =>
                        this.handleSetCollection(collection.id, collection)
                    };
                    return thisObj;
                  })}
                />
              </React.Fragment>
            )}
            {selectedCollection && (
              <Button onClick={this.props.showAllAssets}>
                <Box pad="small" border="all">
                  Show All
                </Box>
              </Button>
            )}
          </Box>
        </Box>
        <Box
          direction="row"
          alignItems="start"
          align="start"
          className={classNames("AssetList")}
          padding="small"
          wrap
          fill="horizontal"
          justify="start"
          // gap="small"
        >
          {assets &&
            assets.map((item, index) => (
              <AssetItem
                key={`assetItem${index}`}
                asset={item}
                assetType={assetType}
                background="#f9f9f9"
                onAssetClick={onAssetClick}
              />
              //           <Button oncClick={console.log} className="assetButton">
              // </Button>
            ))}
          {!assets && (
            <Box align="center" justify="center" fill="horizontal">
              no content
            </Box>
          )}
        </Box>
      </Box>
    );
  }
  handleSetCollection = (id, collection) => {
    this.setState({
      collectionName: collection.name,
      collectionId: id,
      assets: collection.kitties
    });
    console.log("handle set collection", id, collection);
    const { onSelectCollection = () => {} } = this.props;
    onSelectCollection(id, collection);
  };
}

export default AssetList;
