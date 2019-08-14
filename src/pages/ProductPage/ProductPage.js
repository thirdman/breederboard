import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
// import { Succession } from "../../components/Succession/Succession";
//import Loading from "../../components/Loading/Loading";
import AppBar from "../../components/AppBar/AppBar";
import { Notification, Nodes } from "grommet-icons";
import "./ProductPage.scss";
import {
  Box,
  Button,
  Collapsible,
  Heading,
  CheckBox,
  Grommet,
  Menu,
  TextInput,
  Text,
  Tabs,
  Tab
} from "grommet";
import Preview from "../../components/Preview/Preview";
import Swatch from "../../components/Swatch/Swatch";
// const colors = {
//   limey: {
//     from: "hsl(173, 44%, 85%)",
//     to: "#f3f2dd"
//   },
//   violet: {
//     from: "violet",
//     to: "pink"
//   }
// };
class ProductPageComponent extends Component {
  state = {
    previewBackground: "limey",
    previewMode: "collection"
  };
  componentWillMount() {
    const {
      rootStore: { routerStore, ProductStore }
    } = this.props;
    const {
      routerState: { params }
    } = routerStore;
    const { id } = params;
    if (id) {
      ProductStore.path = `products/${id}`;
    } else {
      console.log("no id");
      return false;
    }
  }
  render() {
    const {
      rootStore: { routerStore, ProductStore, ColorsStore, TemplatesStore }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id = "poster", stage } = params;
    const { previewBackground, previewMode } = this.state;
    const {
      productSize,
      productBackground,
      productMode,
      contrast,
      title = "DJ Meowlody",
      subtitle = "1674258 | Gen 12",
      hasTitle,
      hasSubtitle
    } = ProductStore;
    const { colors } = ColorsStore;
    const templateObject = TemplatesStore.templates.filter(
      template => template.name === id
    )[0];
    console.log("params: ", id, stage);
    console.log("templateObject: ", templateObject);
    console.log("hasSubtitle: ", hasSubtitle);
    return (
      <div
        className={classNames("ProductPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        <Heading level={2}>{stage}</Heading>
        {stage && stage === "config" && (
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
              basis="2/3"
            >
              <Preview
                background={productBackground}
                displayMode={productMode}
                hasTitle={hasTitle}
                hasSubtitle={hasSubtitle}
                hasBorder={templateObject && templateObject.hasBorder}
                title={title}
                subtitle={subtitle}
                contrast={contrast}
                aspect={templateObject && templateObject.aspect}
                template={templateObject && templateObject.name}
              />
            </Box>
            <Box
              direction="column"
              justify="between"
              // pad="small"
              basis="1/3"
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
                <Heading level={4}>Asset</Heading>
                <Text>DJ Meowlody</Text>
                <Menu
                  label="Select"
                  items={[
                    { label: "Dj Meowlody", onClick: () => {} },
                    { label: "Glitter", onClick: () => {} }
                  ]}
                />
                <Box
                  border={{
                    color: "border",
                    size: "small",
                    style: "solid",
                    side: "top"
                  }}
                  pad={{ top: "small" }}
                  animation="slideLeft"
                >
                  <Heading margin="none" level={4}>
                    Background: {productBackground}
                  </Heading>
                  <Box align="start" justify="start" direction="row" wrap>
                    {colors &&
                      colors.map(color => (
                        <Button
                          alignSelf="start"
                          // style={{ display: "inline-flex" }}
                          key={color.name}
                          onClick={() => this.handleBackground(color.name)}
                          primary={productBackground === color.name}
                          className="swatchButton"
                        >
                          <Swatch
                            from={color.from}
                            to={color.to}
                            isSelected={productBackground === color.name}
                          />
                        </Button>
                      ))}
                  </Box>
                </Box>
                <Box
                  border={{
                    color: "border",
                    size: "small",
                    style: "solid",
                    side: "top"
                  }}
                  margin={{ top: "small" }}
                  pad={{ top: "small" }}
                  animation="slideLeft"
                >
                  <Heading level={4} margin="none" pad="small">
                    Titles
                  </Heading>
                  <Box margin={{ bottom: "small" }}>
                    <CheckBox
                      checked={hasTitle}
                      label="Include Title"
                      onChange={event =>
                        this.handleHasTitle(event.target.checked)
                      }
                    />
                  </Box>
                  {/* <Button onClick={() => this.handleTitle("DJ Meowlody")} primary>
                  Set title
                </Button> */}
                  {hasTitle && (
                    <TextInput
                      placeholder="type here"
                      value={title}
                      onChange={event => this.handleTitle(event.target.value)}
                      margin="small"
                      className="textInput"
                    />
                  )}
                  {hasTitle && (
                    <Box margin={{ top: "small" }}>
                      <CheckBox
                        checked={hasSubtitle}
                        label="Subtitle"
                        onChange={event =>
                          this.handleHasSubtitle(event.target.checked)
                        }
                      />
                    </Box>
                  )}
                  {hasTitle && (
                    <React.Fragment>
                      <Box direction="row" margin={{ top: "small" }}>
                        <TextInput
                          placeholder="type here"
                          value={subtitle || "1674258 | Gen 12"}
                          onChange={event =>
                            this.handleSubtitle(event.target.value)
                          }
                          className="textInput"
                        />
                        {/* <Button onClick={() => this.handleSubtitle()}>
                          save
                        </Button> */}
                      </Box>
                    </React.Fragment>
                  )}
                </Box>
              </Box>
              <Box
                // align="spaceBetween"
                direction="row"
                pad="small"
                justifyContent="stretch"
                align="center"
                justify="center"
              >
                <Button
                  onClick={() => this.appLink("products", "none", null)}
                  label="Back"
                />
                <Button
                  onClick={() => this.appLink("render", "1234", "render")}
                  label="next"
                  primary
                />
              </Box>
            </Box>
          </Box>
        )}
      </div>
    );
  }

  handleHasTitle = checked => {
    const {
      rootStore: { ProductStore }
    } = this.props;
    // this.setState(prevState => ({
    //   hasTitle: checked
    // }));
    ProductStore.hasTitle = checked;
    if (ProductStore.title === "") {
      ProductStore.title = "DJ Meowlody";
    }
    if (checked === true) {
      ProductStore.hasSubtitle = checked;
    }
    console.log(ProductStore);
  };
  handleHasSubtitle = checked => {
    console.log("checked", checked);
    const {
      rootStore: { ProductStore }
    } = this.props;
    // this.setState(prevState => ({
    //   hasSubtitle: checked
    // }));
    ProductStore.hasSubtitle = checked;
    if (ProductStore.subtitle === "") {
      ProductStore.subtitle = "1674258 | Gen 12";
    }
  };
  handleTitle = value => {
    const {
      rootStore: { ProductStore }
    } = this.props;
    this.setState(prevState => ({
      previewTitle: value
    }));
    // ProductStore.hasTitle = true;
    ProductStore.title = value;
  };

  handleSubtitle = value => {
    console.log(value);
    const {
      rootStore: { ProductStore }
    } = this.props;
    this.setState(prevState => ({
      previewSubtitle: value
    }));
    ProductStore.subtitle = value;
  };

  handleBackground = value => {
    const {
      rootStore: { ProductStore, ColorsStore }
    } = this.props;
    const { colors } = ColorsStore;
    const thisColorObj = colors.filter(color => color.name === value);
    console.log("colors", colors);
    console.log(thisColorObj[0]);
    this.setState(prevState => ({
      previewBackground: value
    }));
    ProductStore.productBackground = value;
    ProductStore.contrast =
      thisColorObj && thisColorObj[0] && thisColorObj[0].contrast;

    console.log("ProductStore", ProductStore);
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
export const ProductPage = inject("rootStore")(observer(ProductPageComponent));
