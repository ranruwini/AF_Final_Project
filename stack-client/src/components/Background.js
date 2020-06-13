import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";


var NewComponent = React.createClass({
    render: function() {
      return (
        <div>
          body, html {'{'}
          height: 100%;
          {'}'}
          .bg {'{'} 
          /* The image used */
          background-image: url("img_girl.jpg");
          /* Full height */
          height: 100%; 
          /* Center and scale the image nicely */
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          {'}'}
        </div>
      );
    }
  });