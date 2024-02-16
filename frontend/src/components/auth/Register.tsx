import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirming password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string(),
});

const Register = () => {
  const { register, loading } = useAuth();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={async (values) => {
        await register(values);
      }}
    >
      {() => (
        <Form>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            px={{ base: 8, md: 16, lg: 24, xl: 64 }}
            className="shadow-2xl h-full"
            zIndex={1}
            gap={4}
          >
            <Text
              fontSize="3xl"
              fontWeight="600"
              color="brand.500"
              className="leading-none"
              mb={8}
            >
              Join our Furrrr community!
            </Text>

            {/* Email Field */}
            <Field name="email">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={!!form.errors.email && !!form.touched.email}
                  fontWeight={300}
                >
                  <FormLabel htmlFor="email">Email address*</FormLabel>
                  <Input {...field} id="email" placeholder="Enter email" />
                  <ErrorMessage name="email" component={FormErrorMessage} />
                </FormControl>
              )}
            </Field>

            {/* Password Field */}
            <Field name="password">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={!!form.errors.password && !!form.touched.password}
                  fontWeight={300}
                >
                  <FormLabel htmlFor="password">Password*</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Enter password"
                  />
                  <ErrorMessage name="password" component={FormErrorMessage} />
                </FormControl>
              )}
            </Field>

            {/* Confirm Password Field */}
            <Field name="confirmPassword">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={
                    !!form.errors.confirmPassword &&
                    !!form.touched.confirmPassword
                  }
                  fontWeight={300}
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirm Password*
                  </FormLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component={FormErrorMessage}
                  />
                </FormControl>
              )}
            </Field>

            {/* First Name Field */}
            <Field name="firstName">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={
                    !!form.errors.firstName && !!form.touched.firstName
                  }
                  fontWeight={300}
                >
                  <FormLabel htmlFor="firstName">First Name*</FormLabel>
                  <Input
                    {...field}
                    id="firstName"
                    placeholder="Enter first name"
                  />
                  <ErrorMessage name="firstName" component={FormErrorMessage} />
                </FormControl>
              )}
            </Field>

            {/* Last Name Field */}
            <Field name="lastName">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={!!form.errors.lastName && !!form.touched.lastName}
                  fontWeight={300}
                >
                  <FormLabel htmlFor="lastName">Last Name*</FormLabel>
                  <Input
                    {...field}
                    id="lastName"
                    placeholder="Enter last name"
                  />
                  <ErrorMessage name="lastName" component={FormErrorMessage} />
                </FormControl>
              )}
            </Field>

            {/* Phone Number Field */}

            <Field name="phoneNumber">
              {({ field, form }: FieldProps<string, FormValues>) => (
                <FormControl
                  isInvalid={
                    !!form.errors.phoneNumber && !!form.touched.phoneNumber
                  }
                  fontWeight={300}
                >
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  {/* inputgroup with selection of +33... code and the number itself */}
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Enter phone number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component={FormErrorMessage}
                  />
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="brand"
              isLoading={loading}
              type="submit"
            >
              Register
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default Register;
