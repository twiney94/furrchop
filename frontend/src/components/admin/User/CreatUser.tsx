import React from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { useUsers } from '../../../hooks/useUsers';

const CreateUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phoneNumber: Yup.string(),
});

const CreateUser = ({ onClose }) => {
  const { createUser } = useUsers();
  const toast = useToast();
  const basePassword = 'Test1234';

  return (
    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
      }}
      validationSchema={CreateUserSchema}
      onSubmit={async (values, actions) => {
        try {
          await createUser({
            ...values,
            password: basePassword,
            confirmPassword: basePassword,
          });
          onClose(); // Close the modal after successful creation
        } catch (error) {
          toast({
            title: 'Error creating user',
            description: (error as Error).message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Flex flexDirection={'column'} gap={4}>
            <Field name="email">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={!!form.errors.email && !!form.touched.email}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input {...field} id="email" placeholder="Enter email" />
                </FormControl>
              )}
            </Field>
            <Field name="firstName">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={
                    !!form.errors.firstName && !!form.touched.firstName
                  }
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="Enter first name"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={!!form.errors.lastName && !!form.touched.lastName}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Enter last name"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="phoneNumber">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={
                    !!form.errors.phoneNumber && !!form.touched.phoneNumber
                  }
                >
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Enter phone number"
                  />
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Create User
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default CreateUser;
