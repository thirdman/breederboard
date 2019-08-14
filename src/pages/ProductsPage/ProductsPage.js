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
      rootStore: { routerStore, ProductStore, TemplatesStore }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id, stage } = params;
    const { previewBackground, previewMode } = this.state;
    const { productSize, productBackground, productMode } = ProductStore;
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
        <Heading> {stage || "sdf"}</Heading>
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
            label="Hero"
            primary={stage && stage === "hero"}
          />
          <Button
            // onClick={() => this.appLink("productsByType", "none", "collection")}
            onClick={() => this.handleMode("collection")}
            label="Collection"
            primary={stage && stage === "collection"}
          />
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
          border={{
            color: "border",
            size: "small",
            style: "solid",
            side: "all"
          }}
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
          >
            <Heading level={3}>Superstar</Heading>
            <Preview background={productBackground} displayMode={productMode} />
            <Button onClick={() => this.appLink("product", "poster", "config")}>
              Customise
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
          >
            <Heading level={3}>Phone</Heading>
            <div
              style={{
                width: "60%",

                display: "flex",

                justifyContent: "center",
                paddingBottom: "3rem"
              }}
            >
              <Preview
                background={productBackground}
                displayMode={productMode}
                aspect="9/16"
                template="phone"
                hasBorder={false}
                hasShadow={false}
              />
            </div>
            <Button onClick={() => this.appLink("product", "phone", "config")}>
              Customise
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
