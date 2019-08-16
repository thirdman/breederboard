import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
// import { Succession } from "../../components/Succession/Succession";
//import Loading from "../../components/Loading/Loading";
import AppBar from "../../components/AppBar/AppBar";
import phoneBg from "./../../assets/previews/1845808.svg";
import "./ProductsPage.scss";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grommet,
  Menu,
  Tabs,
  Tab
} from "grommet";
import Preview from "../../components/Preview/Preview";

class ProductsPageComponent extends Component {
  state = {
    previewBackground: "limey",
    previewMode: "collection"
  };
  render() {
    const {
      rootStore: {
        routerStore,
        UiStore,
        ColorsStore,
        ProductStore,
        TemplatesStore,
        AssetStore,
        AssetsStore,
        CollectionStore
      }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id, stage = "hero" } = params;
    const { previewBackground, previewMode } = this.state;
    const { productSize, productBackground, productMode } = ProductStore;
    const {
      collectionId,
      collectionName,

      collection
    } = CollectionStore;
    const { colors } = ColorsStore;
    const { assets } = AssetsStore;
    const { productTheme } = UiStore;
    const hasAssets = AssetsStore && AssetsStore.assets.length > 0;
    const phoneTemplate = TemplatesStore.templates.filter(
      template => template.name === "phone"
    )[0];
    console.log("phoneTemplate", phoneTemplate);
    console.log("props: ", this.props);
    console.log("stage: ", stage);
    console.log("id: ", id);
    const activeIndex = stage && stage === "collection" ? 1 : 0;
    return (
      <div
        className={classNames("ProductsPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        {/* <AppBar appLink={this.appLink} handleToggle={this.props.handleToggle} /> */}
        {/* <Heading> {stage || "sdf"}</Heading> */}
        <Box
          pad="medium"
          margin="large"
          round="medium"
          direction="row"
          align="stretch"
          justify="center"
        >
          <Button
            // onClick={() => this.appLink("productsByType", "none", "hero")}
            onClick={() => this.handleMode("hero")}
            // label="Hero"

            // primary={stage && stage === "hero"}
          >
            <Box
              pad="small"
              round="small"
              border="all"
              background={stage && stage === "hero" && "brand"}
            >
              Hero
            </Box>
          </Button>
          <Button
            // onClick={() => this.appLink("productsByType", "none", "collection")}
            onClick={() => this.handleMode("collection")}
            // primary={stage && stage === "collection"}
          >
            <Box
              pad="small"
              round="small"
              border="all"
              background={stage && stage === "collection" && "brand"}
            >
              Collection
            </Box>
          </Button>
        </Box>
        {/* <Tabs activeIndex={activeIndex}>
          <Tab label="hero" pad="small">
            <Box pad="medium" margin="large" round="medium">
              Hero
            </Box>
          </Tab>
          <Tab label="collection">
            <Box pad="medium" margin="large" round="medium">
              products featuring a set of assets
            </Box>
          </Tab>
        </Tabs> */}
        <Box
          basis="full"
          // border={{
          //   color: "border",
          //   size: "small",
          //   style: "solid",
          //   side: "all"
          // }}
          direction="row"
          justify="stretch"
          align="stretch"
          alignItems="center"
          justifyContent="center"
          round="medium"
          margin="large"
        >
          <Box
            animation="slideUp"
            justify="center"
            align="center"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            pad="small"
            basis="1/2"
            onClick={() => this.appLink("product", "poster", "config")}
          >
            <Heading level={3} margin="none">
              Superstar
            </Heading>
            <Preview
              //background={productBackground}
              templateName="poster"
              templateType="poster"
              background={UiStore.productTheme}
              displayMode={stage}
              collection={hasAssets ? assets : collection}
            />
            <Button onClick={() => this.appLink("product", "poster", "config")}>
              <Box round="large" border="all" pad="small">
                Customise...
              </Box>
            </Button>
          </Box>
          <Box
            animation="slideUp"
            justify="center"
            align="center"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            pad="small"
            basis="1/2"
            onClick={() => this.appLink("product", "phone", "config")}
          >
            <Heading margin="small" level={3}>
              Phone
            </Heading>
            <div
              style={{
                width: "60%",

                display: "flex",

                justifyContent: "center",
                paddingBottom: "3rem"
              }}
            >
              <Preview
                // background={productBackground}
                background={UiStore.productTheme}
                displayMode={stage}
                aspect="9/16"
                templateName="phone"
                templateType="phone"
                hasBorder={false}
                hasShadow={false}
                collection={hasAssets ? assets : collection}
              />
            </div>
            <Button onClick={() => this.appLink("product", "phone", "config")}>
              <Box round="large" border="all" pad="small">
                Customise...
              </Box>
            </Button>
          </Box>
          <Box
            direction="column"
            justify="between"
            // pad="small"
            basis="1/2"
            border="left"
            // background="brand"
            // round={{
            //   size: "medium",
            //   corner: "top-right"
            // }}
            color="brand"
          >
            <Box
              align="stretch"
              pad="small"
              basis="90%"
              border={{
                color: "border",
                size: "small",
                style: "solid",
                side: "bottom"
              }}
            >
              <Box>
                <Heading level={4} margin="none">
                  Theme
                </Heading>
                <Menu
                  label={productTheme ? productTheme : "Select"}
                  items={
                    colors &&
                    colors.map(color => {
                      const obj = {
                        label: color.name,
                        onClick: () => this.handleBackground(color.name)
                      };
                      return obj;
                    })
                  }
                />
              </Box>
              <Heading level={4}>Product type</Heading>
              <Menu
                label="Menu"
                items={[
                  { label: "Poster", onClick: () => {} },
                  { label: "Artwork", onClick: () => {} }
                ]}
              />
            </Box>
            <Box
              // align="between"
              direction="row"
              pad="small"
              justifyContent="stretch"
              align="center"
              justify="center"
            >
              <Button
                onClick={() => this.appLink("products", null, "hero")}
                // color="brand"
                label="Back"
              />
              <Button
                onClick={() => this.appLink("product", 1234, "config")}
                // background="brand"
                label="next"
                primary
              />
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
  handleMode = value => {
    const {
      rootStore: { ProductStore }
    } = this.props;
    this.setState(prevState => ({
      previewMode: value
    }));
    ProductStore.productMode = value;

    console.log("ProductStore", ProductStore);
    this.appLink("productsByType", "none", value);
    // ProductStore.update({
    //   productBackground: value
    // });
  };

  handleBackground = value => {
    const {
      rootStore: { ProductStore, ColorsStore, UiStore }
    } = this.props;
    const { colors } = ColorsStore;
    const thisColorObj = colors.filter(color => color.name === value);
    console.log(thisColorObj[0]);
    this.setState(prevState => ({
      previewBackground: value
    }));
    ProductStore.productBackground = value;
    ProductStore.contrast =
      thisColorObj && thisColorObj[0] && thisColorObj[0].contrast;
    UiStore.productTheme = value;
    UiStore.productContrast =
      thisColorObj && thisColorObj[0] && thisColorObj[0].contrast;
    UiStore.productColorObj = thisColorObj;
    console.log("ProductStore", ProductStore);
  };

  ////////////////
  // MISC
  ////////////////

  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id, stage: stage });
  };
}
export const ProductsPage = inject("rootStore")(
  observer(ProductsPageComponent)
);
