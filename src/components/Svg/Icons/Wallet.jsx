import React from "react";
import Svg from "../Svg";

const Wallet = (props) => {
  return (
    <Svg viewBox="0 0 17 18" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.810436 0.807556C1.32935 0.289861 2.03315 -0.000976562 2.767 -0.000976562H13.1906C13.648 -0.000976562 14.0867 0.180299 14.4101 0.502972C14.7336 0.825646 14.9153 1.26328 14.9153 1.71961V4.15869H15.2754C15.7328 4.15869 16.1714 4.33996 16.4949 4.66264C16.8183 4.98531 17 5.42295 17 5.87927V16.2784C17 16.7348 16.8183 17.1724 16.4949 17.4951C16.1714 17.8177 15.7328 17.999 15.2754 17.999H2.767C2.03315 17.999 1.32935 17.7082 0.810436 17.1905C0.291523 16.6728 0 15.9706 0 15.2385V2.75953C0 2.0274 0.291522 1.32525 0.810436 0.807556ZM1.36455 5.13919V15.2385C1.36455 15.6096 1.51231 15.9655 1.77532 16.2279C2.03833 16.4903 2.39505 16.6377 2.767 16.6377H15.2754C15.3709 16.6377 15.4625 16.5998 15.53 16.5325C15.5975 16.4651 15.6355 16.3737 15.6355 16.2784V5.87927C15.6355 5.784 15.5975 5.69262 15.53 5.62525C15.4625 5.55788 15.3709 5.52003 15.2754 5.52003H2.767C2.26965 5.52003 1.7861 5.38644 1.36455 5.13919ZM13.5507 4.15869H2.767C2.39505 4.15869 2.03833 4.01128 1.77532 3.74888C1.51231 3.48649 1.36455 3.13061 1.36455 2.75953C1.36455 2.38845 1.51231 2.03257 1.77532 1.77017C2.03833 1.50778 2.39505 1.36037 2.767 1.36037H13.1906C13.2861 1.36037 13.3777 1.39822 13.4453 1.46559C13.5128 1.53296 13.5507 1.62433 13.5507 1.71961V4.15869Z"
      />
    </Svg>
  );
};

export default Wallet;
