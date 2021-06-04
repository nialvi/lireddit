import React from "react";
import { NavBar } from "./navBar";
import { Wrapper, WrapperVariants } from "./wrapper";

interface LayoutProps {
  variant?: WrapperVariants;
}

export const Layout: React.FC<LayoutProps> = ({
  variant = "regular",
  children,
}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
