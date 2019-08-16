import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Menu,
  Tabs,
  Tab,
  Layer,
  Stack,
  Text
} from "grommet";
import { Fireball, StatusGood } from "grommet-icons";
import Preview from "../../components/Preview/Preview";
import AppBar from "../../components/AppBar/AppBar";
import themeFile from "../../theme.json";
import "./HomePage.scss";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

class HomePageComponent extends Component {
  render() {
    const {
      rootStore: {
        routerStore,
        UiStore,
        AssetStore,
        AssetsStore,
        CollectionStore
      }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id } = params;
    const { asset } = AssetStore;
    const {
      collectionId,
      collectionName,
      // assets,
      collection
    } = CollectionStore;
    const { assets } = AssetsStore;
    const hasAssets = AssetsStore && AssetsStore.assets.length > 0;
    console.log("hasAssets", hasAssets);
    console.log("assets", assets);
    console.log("CollectionStore", CollectionStore);
    console.log("collection", collection);
    console.log("asset? ", asset);
    console.log("UiStore", UiStore);
    console.log("UiStore.productTheme", UiStore.productTheme);
    if (params.id) {
      // GameStore.path = `games/${params.id}`;
    }

    return (
      <div
        className={classNames("HomePage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        {/* <AppBar appLink={this.appLink} handleMenu={this.handleMenu} /> */}

        <Collapsible direction="horizontal" open={UiStore && UiStore.hasMenu}>
          <Box
            flex
            width="medium"
            background="light-2"
            elevation="small"
            align="center"
            justify="center"
          >
            sidebar
          </Box>
        </Collapsible>

        <Box
          justify="center"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Heading level={2} margin="large">
            Show off your Digital Assets!
          </Heading>
        </Box>
        <Box
          basis="full"
          // border={{
          //   color: "border",
          //   size: "small",
          //   style: "solid",
          //   side: "all"
          // }}
          direction="row"
          // align="stretch"
          alignItems="center"
          justifyContent="center"
          // round="large"
          // margin="large"
          pad="small"
          // background="border"

          justify="center"
        >
          <p>Connect your ethereum wallet and print one of a kind products</p>
        </Box>
        <Box
          margin="medium"
          align="center"
          justify="center"
          gap="small"
          direction="row"
        >
          <Fireball color="violet" />
          <Text>Unique products based on your own assets</Text>
          <Fireball color="violet" />
          <Text>no data stored</Text>
          <Fireball color="violet" />
          <Text>templates released regularly</Text>
        </Box>
        <Box
          border={{
            color: "border",
            size: "small",
            style: "solid",
            side: "top"
          }}
          direction="row"
          justify="stretch"
          align="stretch"
          justifyContent="center"
          round="none"
          margin="none"
          alignItems="center"
          // style={{ maxWidth: "1000px" }}
        >
          <Box
            pad="medium"
            basis="1/2"
            justify="stretch"
            align="center"
            justifyContent="center"
            overflow="hidden"
            style={{ position: "relative" }}
            className={"testy"}
            onClick={() => this.appLink("productsByType", "none", "collection")}
          >
            <Heading level={3}>For a collection</Heading>

            <Box
              alignSelf="center"
              basis="100%"
              fill
              align="center"
              style={{ maxWidth: "30rem", position: "relative" }}
            >
              <Stack anchor="center" fill>
                <Box
                  alignSelf="center"
                  basis="1"
                  fill
                  // alignItems="center"
                  align="center"
                >
                  <Preview
                    displayMode="collection"
                    collection={hasAssets ? assets : collection}
                    title={collectionName}
                    background={UiStore.productTheme}
                  />
                </Box>
              </Stack>
              <Box className="secondaryPreview">
                <Preview
                  displayMode="collection"
                  collection={hasAssets ? assets : collection}
                  title={collectionName}
                  background={UiStore.productTheme}
                  templateType="phone"
                  
                  hasBorder={false}
                  aspect="9/16"
                />
              </Box>
              <AspectRatio
                ratio="1/1"
                style={{ position: "absolute", width: "90%", zIndex: -1 }}
              >
                <div
                  className="circleWrap"
                  style={{
                    width: "100%",
                    position: "absolute",
                    left: "50%",
                    top: "-50%",
                    transform: "scale(1.9)"
                  }}
                >
                  <div
                    className="circle"
                    style={{
                      width: "100%",
                      background: "#f6f6f6",
                      height: "100%",
                      borderRadius: "100%"
                    }}
                  />
                </div>
              </AspectRatio>
            </Box>

            <Button
              onClick={() => this.appLink("productsByType", "", "collection")}
              color="brand"
            >
              View Products
            </Button>
          </Box>
          <Box
            basis="1/2"
            border={{
              color: "border",
              size: "small",
              style: "solid",
              side: "left"
            }}
            pad="medium"
            justify="stretch"
            align="center"
            justifyContent="center"
            overflow="hidden"
            style={{ position: "relative" }}
            className={"testy"}
            onClick={() => this.appLink("productsByType", "none", "hero")}
          >
            <Heading level={3}>For a single item</Heading>
            <Box
              alignSelf="center"
              basis="100%"
              fill
              align="center"
              style={{ maxWidth: "30rem", position: "relative" }}
            >
              <Stack anchor="center" fill>
                <Box
                  alignSelf="center"
                  basis="1"
                  fill
                  // alignItems="center"
                  align="center"
                >
                  <Preview
                    displayMode="hero"
                    source={asset && asset.image_url_cdn}
                    background={UiStore.productTheme}
                  />
                </Box>
              </Stack>
              <Box className="secondaryPreview">
                <Preview
                  displayMode="hero"
                  source={asset && asset.image_url_cdn}
                  background={UiStore.productTheme}
                  templateType="phone"
                  hasBorder={false}
                  aspect="9/16"
                />
              </Box>
              <AspectRatio
                ratio="1/1"
                style={{ position: "absolute", width: "90%", zIndex: -1 }}
              >
                <div
                  className="circleWrap"
                  style={{
                    width: "100%",
                    position: "absolute",
                    left: "50%",
                    top: "-50%",
                    transform: "scale(1.9)"
                  }}
                >
                  <div
                    className="circle"
                    style={{
                      width: "100%",
                      background: "#f6f6f6",
                      height: "100%",
                      borderRadius: "100%"
                    }}
                  />
                </div>
              </AspectRatio>
            </Box>

            <Button
              onClick={() => this.appLink("productsByType", "none", "hero")}
              color="brand"
            >
              View Products
            </Button>
          </Box>
        </Box>
      </div>
    );
  }

  ////////////////
  // MISC
  ////////////////
  handleMenu = value => {
    const {
      rootStore: { UiStore }
    } = this.props;
    console.log("hasMenu", UiStore.hasMenu);
    UiStore.hasMenu = !UiStore.hasMenu;
    console.log("handle menu", UiStore);
  };
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id || "none", stage: stage || "none" });
  };
}
export const HomePage = inject("rootStore")(observer(HomePageComponent));
