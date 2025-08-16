import { IHtagProps } from "./Htag.props";
import {JSX} from "react";

export const Htag = ({ tag, children, id, className }: IHtagProps): JSX.Element => {

  switch (tag) {
    case "h1":
      return (
        <h1
          className={`tracking-wide font-bold md:text-5xl text-3xl ${className}`.trim()}
          id={id}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`tracking-wide font-bold md:text-[38px] text-[24px] ${className}`.trim()}
          id={id}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`tracking-wide font-bold md:text-2xl text-xl ${className}`.trim()}
          id={id}
        >
          {children}
        </h3>
      );
    default:
      return <></>;
  }
};