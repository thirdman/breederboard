import React, { Component } from "react";
import classNames from "classnames";
import AspectRatio from "react-aspect-ratio";
import "react-aspect-ratio/aspect-ratio.css";

import "./Preview.scss";
import mockup from "../../assets/temp/1674119.png";
import blue from "../../assets/temp/1674054.svg";
import phoneBg from "./../../assets/previews/18458082.svg";

class Preview extends Component {
  render() {
    // const { showSidebar } = this.state;
    const {
      displayMode = "collection",
      background = "limey",
      template = "poster",
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
      <div className={classNames("Preview", template)}>
        <AspectRatio ratio={aspect}>
          <div
            id={domId}
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
                      <div className="box">
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
                <div className="theTitle">{title}</div>
                {hasSubtitle && subtitle && (
                  <div className="theSubtitle">{subtitle}</div>
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
            {template === "phone" && (
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
