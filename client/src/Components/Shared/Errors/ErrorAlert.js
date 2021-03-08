import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Spinner,
  Text,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Redirect } from "react-router-dom";

const ErrorAlert = ({
  heading = "Error",
  description = "Something went wrong",
}) => {
  return (
    <Alert status='error' variant='left-accent' color='gray.800' w='auto'>
      <AlertIcon />
      <AlertTitle>{heading}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
