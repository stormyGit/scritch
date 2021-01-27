import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import classnames from "classnames";

import { useWombatTheme } from "../..";

type ParagraphProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const P: React.FC<ParagraphProps> = React.memo(
  React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const paragraphStyle = classnames(theme.typography.p, className);

      return (
        <p className={paragraphStyle} {...props} ref={ref}>
          {children}
        </p>
      );
    }
  )
);

type SpanProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export const Span: React.FC<SpanProps> = React.memo(
  React.forwardRef<HTMLSpanElement, SpanProps>(
    ({ children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const spanStyle = classnames(theme.typography.span, className);

      return (
        <span className={spanStyle} {...props} ref={ref}>
          {children}
        </span>
      );
    }
  )
);
