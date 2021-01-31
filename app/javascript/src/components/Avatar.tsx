import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";

import { Link } from "react-router-dom";

import { AvatarIcon, BuildingIcon, ContractIcon } from "../icons";

// prettier-ignore
type TailwindSize = 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |  14 | 15 | 16 | 20 | 24 | 28 | 32  | 36 | 40 | 44 | 48;

type AvatarPlaceholderProps = {
  name?: string;
  size?: TailwindSize;
  type?: "user" | "host" | "company" | "document";
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({
  name,
  size,
  type,
}) => {
  return (
    <>
      {type === "user" && (
        <span
          className={`inline-block w-${size} h-${size} rounded-full shadow-sm overflow-hidden bg-light-0`}
        >
          <AvatarIcon iconClassName="w-full h-full text-light-900" />
        </span>
      )}
      {type === "document" && (
        <div
          className={`w-${size} h-${size} rounded-full bg-light-0 shadow-sm inline-flex items-center justify-center`}
        >
          <ContractIcon iconClassName="text-light-900 w-6 h-6" />
        </div>
      )}
      {type === "host" && (
        <div
          className={`w-${size} h-${size} rounded-full bg-light-0 shadow-sm inline-flex items-center justify-center`}
        >
          <BuildingIcon iconClassName="text-light-900 w-6 h-6" />
        </div>
      )}
      {type === "company" && (
        <div
          className={`w-${size} h-${size} rounded-full bg-light-0 shadow-sm inline-flex items-center justify-center`}
        >
          <BuildingIcon iconClassName="text-light-900 w-6 h-6" />
        </div>
      )}
    </>
  );
};

type AvatarProps = {
  src?: string;
  name?: string;
  size?: TailwindSize;
  alt: string;
  type?: "user" | "host" | "company" | "document";
} & DetailedHTMLProps<SelectHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  (
    { src, name = "", type = "user", size = 12, alt, className, ...props },
    ref
  ) => {
    return (
      <div className={`flex-shrink-0 inline-block ${className}`}>
        {src && (
          <img
            ref={ref}
            className={`w-${size} h-${size} rounded-full object-cover shadow-sm`}
            src={src}
            alt={alt}
            {...props}
          />
        )}
        {!src && <AvatarPlaceholder type={type} size={size} name={name} />}
      </div>
    );
  }
);

type AvatarLinkProps = {
  src?: string;
  primaryText?: string;
  secondaryText?: string;
  size?: TailwindSize;
  alt: string;
  to: string;
  type?: "user" | "host" | "company";
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const AvatarLink = React.memo(
  React.forwardRef<HTMLAnchorElement, AvatarLinkProps>(
    (
      { src, type = "user", size = 12, alt, to, primaryText, secondaryText },
      ref
    ) => {
      return (
        <Link
          to={to}
          className="flex-shrink-0 block group focus:outline-none"
          ref={ref}
        >
          <div className="flex items-center">
            {src && (
              <img
                className={`w-${size} h-${size} rounded-full object-cover`}
                src={src}
                alt={alt}
              />
            )}
            {!src && <AvatarPlaceholder type={type} size={size} name={name} />}
            <div className="ml-3">
              <p className="text-sm font-medium leading-5 text-gray-700 group-hover:text-gray-900">
                {primaryText}
              </p>
              <p className="text-xs font-medium leading-4 text-gray-500 transition duration-150 ease-in-out group-hover:text-gray-700 group-focus:underline">
                {secondaryText}
              </p>
            </div>
          </div>
        </Link>
      );
    }
  )
);

export default React.memo(Avatar);
