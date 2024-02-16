import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './login.module.css';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [emailInput, setEmailInput] = useState('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const [passwordInput, setPasswordInput] = useState('');
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const [isEmailError, setIsEmailError] = useState(false);

  // Check only if user has input, errors are if email does not have @ or .
  const checkEmailError = () => {
    if (!emailInput.includes('@') || !emailInput.includes('.')) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  };

  const buttonDisable = (): boolean => {
    // If email error, email empty and/or password empty
    if (isEmailError || emailInput === '' || passwordInput === '') {
      return true;
    } else {
      return false;
    }
  };

  const logUser = async () => {
    await login(emailInput, passwordInput);
  };

  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      // padding responsive
      px={{ base: 8, md: 16, lg: 24, xl: 64 }}
      className="shadow-2xl"
      zIndex={1}
      gap={4}
    >
      <Text
        fontSize="3xl"
        fontWeight="600"
        color="brand.500"
        className="leading-none"
        mb={4}
      >
        Already chopped your pet with us?
      </Text>
      <FormControl fontWeight={300} isInvalid={isEmailError}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={emailInput}
          onChange={handleEmailChange}
          // on leave focus check if email is valid
          onBlur={checkEmailError}
          id="email"
          placeholder="Enter email"
          // mb={4}
        />
        <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
      </FormControl>

      <FormControl fontWeight={300}>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={passwordInput}
            onChange={handlePasswordChange}
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            id="password"
          />
          <InputRightElement width="4.5rem">
            <Button
              fontWeight={400}
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width={'100%'}
        colorScheme="brand"
        variant="solid"
        size="lg"
        fontWeight={500}
        isDisabled={buttonDisable()}
        isLoading={loading}
        onClick={logUser}
      >
        Login
      </Button>
      <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
      {/* Splitter with dashes and in the middle 'or' */}
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        my={8}
        gap={4}
      >
        <Box className="h-0.5 grow bg-gray-300" />
        <Text fontWeight={500}>or</Text>
        <Box className="h-0.5 grow bg-gray-300" />
      </Flex>
      <Text
        fontSize="3xl"
        fontWeight="600"
        color="brand.500"
        className="leading-none"
        mb={8}
      >
        New here?
      </Text>
      <Button
        width={'100%'}
        colorScheme="purple"
        variant="outline"
        size="lg"
        fontWeight={500}
        onClick={() => navigate('/register')}
      >
        Create my account
      </Button>
    </Flex>
  );
};

export default Login;
