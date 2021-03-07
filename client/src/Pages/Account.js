import React from "react";
import { useSelector } from "react-redux";
import { FirestoreCollection } from "react-firestore";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import { MdDelete } from "react-icons/md";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
  Icon,
} from "@chakra-ui/react";

const Account = () => {
  const auth = useSelector((store) => store.auth);
  return (
    <Flex direction='column'>
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

            return (
              <Flex direction='column'>
                {data.map((integration) => (
                  <Flex
                    align='center'
                    py={4}
                    px={8}
                    borderBottom='1px'
                    borderColor='gray.200'
                  >
                    <Text mr={4}>{integration.type}</Text>
                    <Text mr={4}>{integration.shop}</Text>
                    <Text mr={4}>
                      {formatDistance(subDays(new Date(), 3), new Date(), {
                        addSuffix: true,
                      })}
                    </Text>
                    <Button size='sm'>
                      <Icon as={MdDelete} />
                    </Button>
                  </Flex>
                ))}
              </Flex>
            );
          }}
        </FirestoreCollection>
      </Box>
    </Flex>
  );
};

export default Account;
