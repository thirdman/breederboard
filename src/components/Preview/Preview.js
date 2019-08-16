import React, { Component } from "react";
import classNames from "classnames";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

import "./Preview.scss";
import mockup from "../../assets/temp/1674119.png";
import blue from "../../assets/temp/1674054.svg";
import phoneBg from "./../../assets/previews/18458082.svg";

class Preview extends Component {
  state = {
    elementWidth: 0
  };
  refCallback = element => {
    console.log("refCallback");
    if (element) {
      const elementObject = element.getBoundingClientRect();
      // this.props.getSize(element.getBoundingClientRect());
      console.log("size", elementObject);
      this.setState({ elementWidth: elementObject.width });
    }
    // if (elementObject) {
    //   return elementObject.width;
    // }
  };
  render() {
    // const { showSidebar } = this.state;
    const {
      displayMode = "collection",
      background = "limey",
      template = "poster",
      templateType = "poster",
      domId = "abcd",
      title,
      subtitle,
      hasTitle = false,
      hasSubtitle = false,
      hasBorder = true,
      hasShadow = true,
      hasTextEffect = true,
      isRender = false,
      contrast = "light",
      aspect = "3/4",
      source,
      collection
    } = this.props;
    console.log("collection", collection);

    return (
      <div
        className={classNames("Preview", templateType)}
        ref={this.refCallback}
        data-width={this.state.elementWidth}
        style={{
          "--previewWidth": `${this.state.elementWidth}px`
        }}
      >
        <AspectRatio ratio={aspect}>
          <div
            id={domId}
            // data-content="sdfsdf"
            className={classNames(
              "Poster",
              background,
              contrast,
              isRender ? "isRender" : "",
              hasTitle ? "hasTitle" : "",
              hasTextEffect ? "hasTextEffect" : "",
              hasBorder ? "hasBorder" : "noBorder"
            )}
          >
            <div className="sunburst" />
            {displayMode === "collection" &&
              collection &&
              collection.length > 0 && (
                <div className="grid">
                  {collection.map(asset => {
                    console.log("asset");
                    // asset && asset.image_url_cdn;
                    return (
                      <div className="box" key={`previewElement${asset.id}`}>
                        <div className="circle">
                          <img alt="" src={asset && asset.image_url_cdn} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            {displayMode === "collection" && !collection && (
              <div className="grid">
                <div className="box">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={blue} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={blue} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={blue} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={blue} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={blue} />
                  </div>
                </div>
                <div className="box">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
              </div>
            )}
            {displayMode === "hero" && (
              <div className="grid">
                <div className="box hero">
                  <div className="circle">
                    <img alt="" src={source ? source : mockup} />
                  </div>
                </div>
              </div>
            )}
            {hasTitle && (
              <div className="titlePosition">
                {title && (
                  <div className="theTitle" data-title={title}>
                    {title}
                  </div>
                )}
                {hasTitle && hasSubtitle && subtitle && (
                  <div className="theSubtitle" data-title={subtitle}>
                    {subtitle}
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className={classNames(
              "context",
              background,
              contrast,
              hasBorder ? "hasBorder" : "noBorder",
              hasShadow ? "hasShadow" : ""
            )}
          >
            {(templateType === "phone" || templateType === "tablet") && (
              <div className="contextImageWrap phone">
                <img src={phoneBg} className="phone" />
              </div>
            )}
            <div className="above" />
          </div>
        </AspectRatio>
      </div>
    );
  }
}

export default Preview;
