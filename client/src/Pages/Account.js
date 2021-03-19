import React from "react";
import { useSelector } from "react-redux";
import { FirestoreCollection } from "react-firestore";

// import { MdDelete } from "react-icons/md";
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";

import Layout from "../Components/Layout";
import Integrations from "../Components/Integrations/Integrations";

const Account = () => {
  const auth = useSelector((store) => store.auth);

  console.log("Account", auth);

  return (
    <Layout>
      <Flex direction='column' w='100%' maxW='5xl' mx='auto'>
        <Box>
          <Heading>Account</Heading>
          <Text>Email: {auth.user.email}</Text>
          <Text>User ID: {auth.user.uid}</Text>
        </Box>
        <Box>
          <Heading>Integrations</Heading>
          <FirestoreCollection
            path={"integrations"}
            filter={["ownerUid", "==", auth.user.uid]}
          >
            {({ error, isLoading, data }) => {
              if (error) {
                return (
                  <Alert>
                    <AlertIcon />
                    <AlertDescription>Error: {error}</AlertDescription>
                  </Alert>
                );
              }

              if (isLoading) {
                return <Spinner color='brand.800' />;
              }

              if (data.length === 0) {
                return <Text>No integrations yet</Text>;
              }

              return <Integrations items={data} />;
            }}
          </FirestoreCollection>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Account;
