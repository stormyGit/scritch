import React from "react";
import { IconProps } from ".";

const SelectorSingleIcon = ({ iconClassName, ...props }, ref) => (
  <span {...props} ref={ref}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={iconClassName}
    >
      <circle strokeWidth={2} cx="12" cy="12" r="8" />
      <circle strokeWidth={2} fill="currentColor" cx="12" cy="12" r="2" />
    </svg>
  </span>
);

export default React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(SelectorSingleIcon)
);
