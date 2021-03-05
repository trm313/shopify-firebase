const NavLink = {
  // The styles all nav links have in common
  baseStyle: {
    padding: "0.75em 1em",
    fontSize: "1em",
    textDecoration: "none",
    color: "brand.800",
    backgroundColor: "brand.200",
    borderRadius: "0.5em",
    margin: "auto 1em",
    _hover: {
      textDecoration: "none",
      backgroundColor: "brand.300",
      boxShadow: "lg",
    },
  },
  // Size options
  sizes: {
    sm: {
      fontSize: "0.5em",
      padding: "0.3em 0.5em",
    },
    md: {},
    lg: {
      fontSize: "1.2em",
      padding: "0.9em 1.75em",
    },
  },
  // Variant options: eg. solid, outline
  variants: {
    primary: {
      backgroundColor: "brand.600",
      color: "white",
      boxShadow: "xl",
    },
    secondary: {
      // ...
    },
    link: {
      textDecoration: "underline",
      color: "brand.500",
      fontSize: "1em",
      padding: "0.5em 0",
      backgroundColor: "none",
      borderRadius: "none",
      margin: "0",
      _hover: {
        textDecoration: "underline",
        color: "brand.800",
        backgroundColor: "none",
        boxShadow: "none",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variants: "secondary",
  },
};

export default NavLink;
