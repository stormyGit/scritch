import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import classnames from "classnames";

import { useWombatTheme } from "../..";

type HeaderProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  /**
   * Optional description of the header
   * @default undefined
   */
  description?: React.ReactNode;
};

export const H1: React.FC<HeaderProps> = React.memo(
  React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ description, children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const h1Style = classnames(theme.typography.h1.header, className);
      const descriptionStyle = classnames(theme.typography.h1.description);

      return (
        <>
          <h1 className={h1Style} {...props} ref={ref}>
            {children}
          </h1>
          {description && typeof description === "string" && (
            <p className={descriptionStyle}>{description}</p>
          )}
          {description && typeof description !== "string" && (
            <div className={descriptionStyle}>{description}</div>
          )}
        </>
      );
    }
  )
);

export const H2: React.FC<HeaderProps> = React.memo(
  React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ description, children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const h2Style = classnames(theme.typography.h2.header, className);
      const descriptionStyle = classnames(theme.typography.h2.description);

      return (
        <>
          <h2 className={h2Style} {...props} ref={ref}>
            {children}
          </h2>
          {description && typeof description === "string" && (
            <p className={descriptionStyle}>{description}</p>
          )}
          {description && typeof description !== "string" && (
            <div className={descriptionStyle}>{description}</div>
          )}
        </>
      );
    }
  )
);

export const H3: React.FC<HeaderProps> = React.memo(
  React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ description, children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const h3Style = classnames(theme.typography.h3.header, className);
      const descriptionStyle = classnames(theme.typography.h3.description);

      return (
        <>
          <h3 className={h3Style} {...props} ref={ref}>
            {children}
          </h3>
          {description && typeof description === "string" && (
            <p className={descriptionStyle}>{description}</p>
          )}
          {description && typeof description !== "string" && (
            <div className={descriptionStyle}>{description}</div>
          )}
        </>
      );
    }
  )
);

export const H4: React.FC<HeaderProps> = React.memo(
  React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ description, children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const h4Style = classnames(theme.typography.h4.header, className);
      const descriptionStyle = classnames(theme.typography.h4.description);

      return (
        <>
          <h4 className={h4Style} {...props} ref={ref}>
            {children}
          </h4>
          {description && typeof description === "string" && (
            <p className={descriptionStyle}>{description}</p>
          )}
          {description && typeof description !== "string" && (
            <div className={descriptionStyle}>{description}</div>
          )}
        </>
      );
    }
  )
);

export const H5: React.FC<HeaderProps> = React.memo(
  React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ description, children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const h5Style = classnames(theme.typography.h5.header, className);
      const descriptionStyle = classnames(theme.typography.h5.description);

      return (
        <>
          <h5 className={h5Style} {...props} ref={ref}>
            {children}
          </h5>
          {description && typeof description === "string" && (
            <p className={descriptionStyle}>{description}</p>
          )}
          {description && typeof description !== "string" && (
            <div className={descriptionStyle}>{description}</div>
          )}
        </>
      );
    }
  )
);

export const H6: React.FC<HeaderProps> = React.memo(
  React.forwardRef<HTMLHeadingElement, HeaderProps>(
    ({ children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const h6Style = classnames(theme.typography.h6.header, className);

      return (
        <>
          <h6 className={h6Style} {...props} ref={ref}>
            {children}
          </h6>
        </>
      );
    }
  )
);
