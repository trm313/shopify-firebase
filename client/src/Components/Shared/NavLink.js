// 1. Import useStyleConfig
import { useStyleConfig } from "@chakra-ui/react";

// To leverage react-router-dom through the Chakra Link component, need to pass it through
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

const NavLink = ({ to, onClick, size, variant, ...rest }) => {
  // 2. Reference 'NavLink' stored in 'theme.components'
  const styles = useStyleConfig("NavLink", { size, variant });

  // 3. Pass the computed styles into the 'sx' prop
  return (
    <Link as={RouterLink} onClick={onClick} to={to} sx={styles} {...rest} />
  );
};

export default NavLink;
