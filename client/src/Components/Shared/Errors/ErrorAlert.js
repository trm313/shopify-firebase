// import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

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
