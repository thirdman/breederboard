import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
import domtoimage from "dom-to-image";
import { Box, Button, Heading, Menu, Text } from "grommet";
import { FormNext } from "grommet-icons";
import Loading from "../../components/Loading/Loading";
import Preview from "../../components/Preview/Preview";
import "./RenderPage.scss";

class RenderPageComponent extends Component {
  state = {
    productSize: "a3",
    doRender: false,
    showPreview: true,
    isRendering: false,
    hasRendered: false,
    domId: "abcdefg"
  };
  componentWillMount() {
    const {
      rootStore: { routerStore, ProductStore }
    } = this.props;
    console.log("routerStore", routerStore);
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
  componentDidMount() {
    this.getScreenSize();
  }
  render() {
    const {
      rootStore: { routerStore, ProductStore }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    // const { id, stage } = params;
    const {
      // previewBackground,
      // previewMode,
      // doRender,
      // showPreview,
      isRendering,
      hasRendered,
      domId
    } = this.state;
    const {
      productSize,
      productBackground,
      productMode,
      title,
      subtitle,
      hasTitle
    } = ProductStore;
    // console.log("params: ", id, stage);
    // console.log("ProductStore", ProductStore);

    return (
      <div
        className={classNames("RenderPage", {
          isTransitioning: !!routerStore.isTransitioning
        })}
      >
        <Heading level={5} margin="small">
          <Box
            fill="horizontal"
            align="start"
            justify="start"
            pad="none"
            direction="row"
            gap="xsmall"
            className="breadcrumbs"
          >
            <Button onClick={() => this.appLink("home")}>Flaunt</Button>
            <FormNext color="secondary" />
            <Button onClick={() => this.appLink("products")}>products</Button>
            <FormNext color="secondary" />
            <Button onClick={() => this.appLink("home")}>{productMode}</Button>
            <FormNext color="secondary" />
            <Button onClick={() => this.appLink("product")}>create</Button>
            <FormNext color="secondary" />
            <Text color="mid">render</Text>
          </Box>
        </Heading>
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
            {isRendering && (
              <Box fill="horizontal" align="center" justify="center">
                <Loading text="Rendering..." />
              </Box>
            )}
            {!hasRendered && (
              <Preview
                background={productBackground}
                displayMode={productMode}
                domId={domId}
                isRender
                productSize={productSize}
                hasTitle={hasTitle}
                title={title}
                subtitle={subtitle}
              />
            )}
            {/* {showPreview && 1 === 2 && (
            </div>
                    <div className="hideMe">
            )} */}
            <div id={`target${domId}`} />
          </Box>
          <Box
            direction="column"
            justify="between"
            // pad="small"
            basis="1/3"
            border="left"
            color="brand"
          >
            <Box
              align="start"
              pad="small"
              basis="90%"
              border={{
                color: "border",
                size: "small",
                style: "solid",
                side: "bottom"
              }}
            >
              <Heading level={4}>Size: {productSize}</Heading>
              <Menu
                label="Size"
                items={[
                  { label: "A4", onClick: () => {} },
                  { label: "A3", onClick: () => {} },
                  { label: "A2", onClick: () => {} }
                ]}
              />
              <Button onClick={() => this.handleRender(domId)} label="Render" />
              <Heading level={4}>Your device</Heading>

              <div>
                {this.state.screenW}x{this.state.screenH}
              </div>
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
                onClick={() => this.appLink("product", 1234, "config")}
                // color="brand"
                label="Back"
              />
              <Button
                onClick={() => this.appLink("confirm", 1234, "confirm")}
                // background="brand"
                label="next"
                primary={hasRendered}
              />
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
  handleRender = (renderId = "abcd") => {
    console.log("render", renderId);
    const { domId } = this.state;
    const theSource = document.getElementById(renderId);
    const theTarget = document.getElementById(`target${renderId}`);
    this.setState({ isRendering: true, showPreview: false });
    console.log("theSource", theSource);
    domtoimage
      .toJpeg(theSource, { quality: 1 })
      .then(dataUrl => {
        console.log("dataUrl", dataUrl);
        const img = new Image();
        img.src = dataUrl;
        const innerContent = theTarget.innerHTML;
        const innerContentExists = innerContent.length;
        if (innerContentExists > 0) {
          theTarget.replaceChild(img, theTarget.children[0]);
        } else {
          theTarget.appendChild(img);
        }
        this.setState({
          hasRendered: true,
          isRendering: false,
          showPreview: false,
          dataUrl
        });
        const {
          rootStore: { ProductStore }
        } = this.props;

        ProductStore.imageRender = dataUrl;
        // if (doSave) {
        //   this.doSave(dataUrl);
        // }
      })
      .catch(error => {
        console.error("oops, something went wrong!", error);
      });
  };
  ////////////////
  // MISC
  ////////////////
  getScreenSize = () => {
    console.log(
      "screen.width+screen.height",
      window.screen.width + "x" + window.screen.height
    );
    this.setState({
      screenW: window.screen.width,
      screenH: window.screen.height
    });
  };
  appLink = (routeName, id, stage) => {
    const {
      rootStore: { routerStore }
    } = this.props;
    routerStore.goTo(routeName, { id: id, stage: stage });
  };
}
export const RenderPage = inject("rootStore")(observer(RenderPageComponent));
