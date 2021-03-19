import React, { useState } from "react";
import { formatDistance, subDays } from "date-fns";
import { MdDelete } from "react-icons/md";
import {
  Avatar,
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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import removeIntegration from "../../Actions/Integrations/removeIntegration";
import integrationsEnum from "./integrationsEnum";
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
    <Box py={4} px={8}>
      <Flex
        align='center'
        wrap='no-wrap'
        borderBottom='1px'
        borderColor='gray.200'
      >
        <Tooltip label={integrationsEnum[item.type].name} hasArrow>
          <Avatar
            src={integrationsEnum[item.type].logo}
            name={integrationsEnum[item.type].name}
            mr={4}
            size='sm'
            bg='gray.200'
          />
        </Tooltip>
        <Box flexGrow={1}>
          <Text mr={4} fontSize='lg'>
            {item.shop}
          </Text>
          <Text mr={4} fontSize='xs'>
            Created:{" "}
            {formatDistance(subDays(new Date(), 3), new Date(), {
              addSuffix: true,
            })}
          </Text>
        </Box>

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
      <Flex>
        <Text fontSize='xs' color='gray.500'>
          <strong>Scopes:</strong> public_repo, gist
        </Text>
      </Flex>
    </Box>
  );
};

export default Integration;
