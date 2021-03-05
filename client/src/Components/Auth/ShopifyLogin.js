import React, { useEffect, useState } from "react";
import Firebase from "firebase/app";
import qs from "query-string";
import { Spinner, Box, Text } from "@chakra-ui/react";

const ShopifyLogin = (props) => {
  const [user, setUser] = useState(null);

  // Check for query strings passed from /auth/shopify/callback
  const params = qs.parse(props.location.search);
  const { shop = null, token = null } = params;

  useEffect(() => {
    // Initialize Firebase authentication listener
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, emailVerified, uid } = user;
        setUser({ displayName, email, emailVerified, uid });
      }
    });
  }, []);

  useEffect(() => {
    if (shop && token && user) {
      console.log("Proceed with Shopify integration", {
        shop,
        token,
        user,
      });
    }
  }, [shop, token, user]);

  return (
    <Box
      w='100vw'
      h='100vh'
      backgroundColor='brand.800'
      color='white'
      pos='absolute'
      top={0}
      right={0}
      left={0}
      bottom={0}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Spinner size='xl' />
      <Text my={8}>Getting your Shopify store ready</Text>
    </Box>
  );
};

export default ShopifyLogin;
