// Custom component, loaded by ../theme.js
// Consumed via ../../Components/Shared/NavLink.js

const NavLink = {
  // The styles all nav links have in common
  baseStyle: {
    textDecoration: "none",
    color: "brand.800",
    padding: "1em",
    _hover: {
      textDecoration: "none",
      opacity: "0.8",
      // boxShadow: "lg",
    },
  },
  // Size options
  sizes: {
    sm: {
      fontSize: "0.8em",
      padding: "0.5em 0.8em",
    },
    md: {
      fontSize: "1em",
    },
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
    secondary: {},
    headerPrimary: {
      color: ["brand.500", "brand.500", "white", "white"],
      backgroundColor: ["white", "white", "brand.500", "brand.500"],
      borderRadius: "lg",
      _hover: {
        backgroundColor: ["brand.100", "brand.100", "brand.600", "brand.600"],
      },
    },
    headerSecondary: {
      color: ["white", "white", "brand.500", "brand.500"],
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
