import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FirestoreCollection } from "react-firestore";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
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
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  // useDisclosure,
} from "@chakra-ui/react";

const Account = () => {
  const auth = useSelector((store) => store.auth);

  // const { onOpen, onClose, isOpen } = useDisclosure();
  // Handy for popovers, I can use this if I refactor the IntegrationItem into a component. Then I can delete the below state and logic

  const [pendingDeletionId, setPendingDeletionId] = useState(null);

  const onTriggerPendingDeletion = (id) => {
    setPendingDeletionId(id);
  };

  const onConfirmDeletion = (id) => {
    removeIntegration(id);
    setPendingDeletionId(null);
  };

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
                    <Text mr={4}>{integration.id}</Text>
                    <Text mr={4}>{integration.type}</Text>
                    <Text mr={4}>{integration.shop}</Text>
                    <Text mr={4}>
                      {formatDistance(subDays(new Date(), 3), new Date(), {
                        addSuffix: true,
                      })}
                    </Text>
                    <Popover
                      isOpen={pendingDeletionId === integration.id}
                      onClose={() => setPendingDeletionId(null)}
                      placement='top'
                      closeOnBlur={true}
                    >
                      <PopoverTrigger>
                        <IconButton
                          size='sm'
                          icon={<Icon as={MdDelete} />}
                          colorScheme='red'
                          onClick={() =>
                            onTriggerPendingDeletion(integration.id)
                          }
                        />
                      </PopoverTrigger>
                      <PopoverContent p={4}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirm Deletion</PopoverHeader>
                        <PopoverBody>
                          <Flex align='center' justify='center'>
                            <Button
                              onClick={() => onConfirmDeletion(integration.id)}
                              colorScheme={"red"}
                              mr={4}
                            >
                              Delete
                            </Button>
                            <Button onClick={() => setPendingDeletionId(null)}>
                              Cancel
                            </Button>
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
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
