import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import "./ProductsPage.scss";
import { Box, Button, CheckBox, Heading, Menu } from "grommet";
import Preview from "../../components/Preview/Preview";
import Swatch from "../../components/Swatch/Swatch";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";

class ProductsPageComponent extends Component {
  state = {
    previewBackground: "limey",
    previewMode: "collection"
    // selectedTypes: []
  };
  render() {
    const {
      rootStore: {
        routerStore,
        UiStore,
        ColorsStore,
        // ProductStore,
        TemplatesStore,
        AssetStore,
        AssetsStore,
        CollectionStore
        // ThemesStore
      }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id, stage = "hero" } = params;
    // const { productSize, productBackground, productMode } = ProductStore;
    const {
      // collectionId,
      // collectionName,
      collection
    } = CollectionStore;
    const { colors } = ColorsStore;
    const { assets } = AssetsStore;
    const { asset } = AssetStore;
    const { templates } = TemplatesStore;
    // const { themes } = ThemesStore;
    const { productTheme, productColorObj } = UiStore;
    console.log("productColorObj", productColorObj);
    const hasAssets = AssetsStore && AssetsStore.assets.length > 0;
    const phoneTemplate = TemplatesStore.templates.filter(
      template => template.name === "phone"
    )[0];
    const templateTypes = [
      ...new Set(templates.map(template => template.type))
    ];
    const {
      // previewBackground,
      // previewMode,
      selectedTypes = templateTypes
    } = this.state;

    // console.log("phoneTemplate", phoneTemplate);
    // const activeIndex = stage && stage === "collection" ? 1 : 0;
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
          <ButtonGroup>
            <Button
              // onClick={() => this.appLink("productsByType", "none", "hero")}
              onClick={() => this.handleMode("hero")}
              // label="Hero"

              // primary={stage && stage === "hero"}
            >
              <Box
                pad="small"
                round="xsmall"
                border={
                  stage && stage === "hero"
                    ? {
                        color: "brand",
                        // </Button>size: "small",
                        // </ButtonGroup>style: "solid",
                        side: "all"
                      }
                    : "all"
                }
                background={stage && stage === "hero" ? "brand" : "transparent"}
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
                round="xsmall"
                border={
                  stage && stage === "collection"
                    ? {
                        color: "brand",
                        // </Button>size: "small",
                        // </ButtonGroup>style: "solid",
                        side: "all"
                      }
                    : "all"
                }
                background={
                  stage && stage === "collection" ? "brand" : "transparent"
                }
              >
                Collection
              </Box>
            </Button>
          </ButtonGroup>
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
            onClick={() => this.handleCustomiseLink("poster")}
            className="productSection"
          >
            <Heading level={3} margin="none">
              Superstar
            </Heading>
            <Preview
              //background={productBackground}
              templateName="poster"
              templateType="poster"
              background={UiStore.productTheme}
              sourceImage={asset && asset.image_url_cdn}
              displayMode={stage || "hero"}
              collection={hasAssets ? assets : collection}
            />
            <Button onClick={() => this.handleCustomiseLink("poster")}>
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
            className="productSection"
            onClick={() => this.handleCustomiseLink("phone")}
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
                displayMode={stage || "hero"}
                aspect="9/16"
                templateName="phone"
                templateType="phone"
                hasBorder={false}
                hasShadow={false}
                sourceImage={asset && asset.image_url_cdn}
                collection={hasAssets ? assets : collection}
              />
            </div>
            <Button onClick={() => this.handleCustomiseLink("phone")}>
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
                <Heading level={4} margin="xsmall">
                  Theme
                </Heading>
                <Box direction="row" align="center" justify="between">
                  <Menu
                    margin="xsmall"
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
                  {productColorObj && (
                    <Swatch
                      from={productColorObj.from}
                      to={productColorObj.to}
                    />
                  )}
                </Box>
              </Box>

              <Heading level={4} margin="xsmall" border="top">
                Product type
              </Heading>

              {templateTypes &&
                templateTypes.map(type => (
                  <Box pad="xsmall" key={`typeCheckbox${type}`}>
                    <CheckBox
                      checked={selectedTypes && selectedTypes.includes(type)}
                      label={type}
                      onChange={event =>
                        this.handleSetType(type, event.target.checked)
                      }
                    />
                  </Box>
                ))}
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
    const thisColorObj = colors.filter(color => color.name === value)[0];

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

  handleSetType = (type, checked) => {
    const {
      rootStore: { TemplatesStore }
    } = this.props;
    const { templates } = TemplatesStore;
    const templateTypes = [
      ...new Set(templates.map(template => template.type))
    ];
    const { selectedTypes = templateTypes } = this.state;

    let tempArray;
    if (!selectedTypes) {
      return false;
    }
    if (selectedTypes.includes(type)) {
      tempArray = selectedTypes.filter(template => template !== type);
    } else {
      tempArray = selectedTypes.slice();
      tempArray = tempArray.concat(type);
    }
    this.setState({ selectedTypes: tempArray });
  };
  ////////////////
  // MISC
  ////////////////
  handleCustomiseLink = templateId => {
    console.log("customise linke", templateId);
    const {
      rootStore: { routerStore, ProductStore }
    } = this.props;
    const {
      routerState: { params }
    } = routerStore;
    const { stage = "hero" } = params;
    ProductStore.productMode = stage || "hero";
    this.appLink("product", templateId || "phone", "config");
  };

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
