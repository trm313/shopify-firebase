import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import qs from "query-string";
import { Redirect } from "react-router-dom";
import LoadingScreen from "../Layout/LoadingScreen";
import integrateShopify from "../../Actions/Integrations/integrateShopify";

const ShopifyLogin = (props) => {
  const auth = useSelector((store) => store.auth);
  const [redirectTo, setRedirect] = useState(null);
  const [error, setError] = useState(null);

  // Check for query strings passed from /auth/shopify/callback
  const params = qs.parse(props.location.search);
  const { shop = null, token = null } = params;

  useEffect(() => {
    if (shop && token && auth.isAuthenticated) {
      integrateShopify(shop, token, () => setRedirect("/"), setError);
    }

    if (!shop || !token) {
      setError("Unable to verify Shopify store details");
    }
  }, [shop, token, auth]);

  return (
    <LoadingScreen
      text='Loading'
      subtext='Getting your shopify store ready'
      error={error}
      errorRedirectTo='/'
      errorRedirectDelay={10000}
    >
      {redirectTo && <Redirect to={redirectTo} />}
    </LoadingScreen>
  );
};

export default ShopifyLogin;
