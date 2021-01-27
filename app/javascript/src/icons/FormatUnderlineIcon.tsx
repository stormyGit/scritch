import React from "react";
import { IconProps } from ".";

const FormatUnderlineIcon = ({ iconClassName, ...props }, ref) => (
  <span {...props} ref={ref}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={iconClassName}
    >
      <path d="M16 9A6 6 0 1 1 4 9V1h3v8a3 3 0 0 0 6 0V1h3v8zM2 17h16v2H2v-2z" />
    </svg>
  </span>
);

export default React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(FormatUnderlineIcon)
);
