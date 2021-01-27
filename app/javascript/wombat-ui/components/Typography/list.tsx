import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import classnames from "classnames";

import { useWombatTheme } from "../..";

type OListProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLOListElement>,
  HTMLOListElement
> & {
  items: React.ReactNode[];
};

export const OList: React.FC<OListProps> = React.memo(
  React.forwardRef<HTMLOListElement, OListProps>(
    ({ items, children, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const listStyle = classnames(theme.typography.ol.base, className);
      const itemsStyle = classnames(theme.typography.ol.item);

      return (
        <ol className={listStyle} ref={ref}>
          {items.map((i, index) => (
            <li className={itemsStyle} key={index}>
              {i}
            </li>
          ))}
        </ol>
      );
    }
  )
);

type UListProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: React.ReactNode[];
};

export const UList: React.FC<UListProps> = React.memo(
  React.forwardRef<HTMLUListElement, UListProps>(
    ({ items, className, ...props }, ref) => {
      const { theme } = useWombatTheme();

      const listStyle = classnames(theme.typography.ul.base, className);
      const itemsStyle = classnames(theme.typography.ul.item);

      return (
        <ul className={listStyle} ref={ref}>
          {items.map((i, index) => (
            <li key={index} className={itemsStyle}>
              {i}
            </li>
          ))}
        </ul>
      );
    }
  )
);
