import React from "react";
import { IconProps } from ".";

const AlignLeftIcon = ({ iconClassName, ...props }, ref) => (
  <span {...props} ref={ref}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={iconClassName}
    >
      <path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h12v2H1V5zm0 8h12v2H1v-2z" />
    </svg>
  </span>
);

export default React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(AlignLeftIcon)
);
