import React from "react";
import Lottie from "react-lottie";

const loaderJSON = require("../../loaderJSON.json");

const ScritchSpinner = ({ size }) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: loaderJSON,
        rendererSettings: {
          preserveAspectRatio: ""
        }
      }}
      height={size}
      width={size}
    />
  );
};

export default ScritchSpinner;
