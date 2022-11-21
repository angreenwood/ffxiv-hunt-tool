import React, { Component } from "react";
var __html = require("./privacy");
var template = { __html: __html };

class Privacy extends Component {
  render() {
    return (
      <div className="screen-share">
        <span dangerouslySetInnerHTML={template} />
      </div>
    );
  }
}
export default Privacy;
