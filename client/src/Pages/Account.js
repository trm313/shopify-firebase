import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FirestoreCollection } from "react-firestore";

import removeIntegration from "../Actions/Integrations/removeIntegration";

import { MdDelete } from "react-icons/md";
import {
  Box,
  Button,
  IconButton,
  Flex,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import Integrations from "../Components/Integrations/Integrations";

const Account = () => {
  const auth = useSelector((store) => store.auth);

  return (
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
  );
};

export default Account;
