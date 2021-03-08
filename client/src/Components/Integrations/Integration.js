import React, { useState } from "react";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { MdDelete, MdWarning } from "react-icons/md";
import {
  Box,
  Button,
  IconButton,
  Flex,
  Heading,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  useDisclosure,
} from "@chakra-ui/react";

import removeIntegration from "../../Actions/Integrations/removeIntegration";
import ErrorAlert from "../Shared/Errors/ErrorAlert";

const Integration = ({ item }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [{ isLoading, error }, setResponseState] = useState({
    isLoading: false,
    error: null,
  });

  const onConfirmDelete = () => {
    setResponseState({ isLoading: true, error: null });
    try {
      removeIntegration(item.id);
    } catch (error) {
      setResponseState({ isLoading: false, error });
    }
  };

  return (
    <Flex
      align='center'
      py={14}
      px={8}
      borderBottom='1px'
      borderColor='gray.200'
    >
      <Text mr={4}>{item.id}</Text>
      <Text mr={4}>{item.type}</Text>
      <Text mr={4}>{item.shop}</Text>
      <Text mr={4}>
        {formatDistance(subDays(new Date(), 3), new Date(), {
          addSuffix: true,
        })}
      </Text>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='top'
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            size='md'
            icon={<Icon as={MdDelete} />}
            colorScheme='red'
            onClick={onOpen}
            mr={4}
            isLoading={isLoading}
          />
        </PopoverTrigger>
        <PopoverContent p={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader display='flex' alignItems='center' pt={0}>
            <Heading size='xs'>Confirm Deletion</Heading>
          </PopoverHeader>
          <PopoverBody>
            <Flex align='center' justify='center'>
              <Button
                onClick={() => onConfirmDelete()}
                colorScheme={"red"}
                mr={4}
              >
                Delete
              </Button>
              <Button onClick={() => onClose()}>Cancel</Button>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {error && <ErrorAlert description={error} />}
    </Flex>
  );
};

export default Integration;
