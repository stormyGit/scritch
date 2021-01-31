import React from "react";

import ReachTooltip, {
  TooltipProps as ReachTooltipProps,
} from "@reach/tooltip";

import "@reach/tooltip/styles.css";
import "./Tooltip.css";

type TooltipProps = ReachTooltipProps;

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, ...props }, ref) => {
    return (
      <ReachTooltip {...props} ref={ref}>
        {children}
      </ReachTooltip>
    );
  }
);

export default React.memo(Tooltip);
