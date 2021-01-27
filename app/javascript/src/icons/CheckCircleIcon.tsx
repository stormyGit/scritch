import React from "react";
import { IconProps } from ".";

const CheckCirleIcon = ({ iconClassName, ...props }, ref) => (
  <span {...props} ref={ref}>
    <svg
      className={iconClassName}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </span>
);

export default React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(CheckCirleIcon)
);
