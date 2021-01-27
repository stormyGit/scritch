import React from "react";
import { IconProps } from ".";

const AnalyticsIcon = ({ iconClassName, ...props }, ref) => (
  <span {...props} ref={ref}>
    <svg
      className={iconClassName}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
      >
      </path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
      >
      </path>
    </svg>
  </span>
);

export default React.memo(
  React.forwardRef<HTMLSpanElement, IconProps>(AnalyticsIcon)
);
