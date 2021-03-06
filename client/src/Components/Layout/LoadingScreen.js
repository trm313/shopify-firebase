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

const LoadingScreen = ({
  children,
  text = "Loading",
  subtext = null,
  error = null,
  errorRedirectTo = null,
  errorRedirectDelay = 4000,
}) => {
  const [redirectTimer, setRedirectTimer] = useState(errorRedirectDelay);

  useEffect(() => {
    if (error && errorRedirectTo) {
      const interval = setInterval(() => {
        if (redirectTimer > 0) {
          setRedirectTimer((redirectTimer) => redirectTimer - 1000);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [error, redirectTimer]);

  return (
    <Flex
      w='100vw'
      h='100vh'
      position='absolute'
      top={0}
      left={0}
      bg='brand.800'
      color='white'
      direction='column'
      justify='center'
      align='center'
    >
      {!error && (
        <>
          <Spinner size='xl' />
          <Text fontSize='xl' mt={8} mb={2}>
            {text}
          </Text>
          {subtext && <Text fontSize='sm'>{subtext}</Text>}
        </>
      )}
      {error && (
        <Alert status='error' color='gray.800' w='auto'>
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{`${error}. Redirecting in ${
            redirectTimer / 1000
          } seconds.`}</AlertDescription>
        </Alert>
      )}
      {error && errorRedirectTo && redirectTimer === 0 && (
        <Redirect to={errorRedirectTo} />
      )}
      {children}
    </Flex>
  );
};

export default LoadingScreen;
