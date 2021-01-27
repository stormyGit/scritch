import React from "react";
import { IconProps } from ".";

const SelectorMultipleIcon = ({ iconClassName, ...props }, ref) => (
  <span {...props} ref={ref}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={iconClassName}
    >
      <rect strokeWidth="2" x="2" y="2" width="20" height="20" rx="3" ry="3" />
    </svg>
  </span>
);

export default React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(SelectorMultipleIcon)
);
