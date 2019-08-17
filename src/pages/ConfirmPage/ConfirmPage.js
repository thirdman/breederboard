import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import classNames from "classnames";
// import { Succession } from "../../components/Succession/Succession";
//import Loading from "../../components/Loading/Loading";
import AppBar from "../../components/AppBar/AppBar";
import Loading from "../../components/Loading/Loading";
import {
  FormNext,
  StatusGood,
  StatusDisabled,
  StatusCritical
} from "grommet-icons";
import "./ConfirmPage.scss";
import {
  Box,
  Button,
  Heading,
  Menu,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Text
} from "grommet";
import Preview from "../../components/Preview/Preview";

class ConfirmPageComponent extends Component {
  state = {
    previewBackground: "limey",
    previewMode: "collection",
    productSize: "a3"
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
  render() {
    const {
      rootStore: { routerStore, ProductStore }
    } = this.props;

    const {
      routerState: { params }
    } = routerStore;
    const { id, stage } = params;
    const { previewBackground, previewMode } = this.state;
    const {
      productSize,
      productBackground,
      productMode,
      template,
      title,
      subtitle,
      hasTitle
    } = ProductStore;
    console.log("params: ", id, stage);
    console.log("ProductStore", ProductStore);
    return (
      <div
        className={classNames("ConfirmPage", {
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
            <Button onClick={() => this.appLink("product")}>render</Button>
            <FormNext color="secondary" />
            <Text color="mid">Confirm</Text>
          </Box>
        </Heading>
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
            basis="1/3"
          >
            <Loading />
          </Box>
          <Box
            direction="column"
            justify="between"
            // pad="small"
            basis="2/3"
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
              <Heading level={4}>Confirm</Heading>
              <Box
                pad="small"
                direction="row"
                gap="small"
                justify="between"
                border="top"
                fill="horizontal"
              >
                <Text>
                  <strong>Has Render</strong>
                </Text>
                {ProductStore.imageRender ? (
                  <Box gap="small" direction="row" basis="1/2">
                    <StatusGood color="lime" size="medium" />
                    <Text>YES</Text>
                  </Box>
                ) : (
                  <Box gap="small" direction="row" basis="1/2">
                    <StatusCritical color="red" size="medium" />
                    <Text color="red">No</Text>
                  </Box>
                )}
              </Box>
              <Box direction="row" fill>
                <Table>
                  {/* <TableHeader>
                    <TableRow>
                      <TableCell scope="col" border="bottom">
                        Attribute
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHeader> */}
                  <TableBody>
                    <TableRow>
                      <TableCell scope="row">
                        <strong>Template</strong>
                      </TableCell>
                      <TableCell>{template}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell scope="row">
                        <strong>Size</strong>
                      </TableCell>
                      <TableCell>{productSize}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell scope="row">
                        <strong>Theme</strong>
                      </TableCell>
                      <TableCell>{productBackground}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell scope="row">
                        <strong>Mode</strong>
                      </TableCell>
                      <TableCell>{productMode}</TableCell>
                    </TableRow>
                    {hasTitle && (
                      <React.Fragment>
                        <TableRow>
                          <TableCell scope="row">
                            <strong>Title</strong>
                          </TableCell>
                          <TableCell>"{title}"</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell scope="row">
                            <strong>Subtitle</strong>
                          </TableCell>
                          <TableCell>"{subtitle}"</TableCell>
                        </TableRow>
                      </React.Fragment>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Box>
            <Box
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
                onClick={() => this.appLink("about", null)}
                // background="brand"
                label="Add to cart"
                primary
              />
            </Box>
          </Box>
        </Box>
      </div>
    );
  }

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
export const ConfirmPage = inject("rootStore")(observer(ConfirmPageComponent));
