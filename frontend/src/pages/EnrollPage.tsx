import {
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, ErrorMessage } from "formik";
import * as Yup from "yup";

const enrollSchema = Yup.object().shape({
  kbis: Yup.string().required("KBIS is required"),
});

const Enroll = () => {

  return (
    <Flex direction={"column"} justifyContent={"center"} h={"100%"} background={"gray.300"} gap={4}>
      <Heading color={"brand.300"} fontWeight={600} size={"4xl"}>
        Hop, hop, it's time to chop!
      </Heading>
      <Heading as="h2" size="md" color={"brand.300"} fontWeight={500}>
        Enroll your business and start grooming!
      </Heading>
      <Card p={8} m={16}>
        <Formik
          initialValues={{
            kbis: "",
          }}
          validationSchema={enrollSchema}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <Form>
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                px={{ base: 8, md: 16, lg: 24, xl: 64 }}
                className="shadow-2x l h-full"
                zIndex={1}
                gap={4}
                p={8}
              >
                <Field name="kbis">
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={!!(form.errors.kbis && form.touched.kbis)}
                    >
                      <FormLabel htmlFor="kbis">KBIS</FormLabel>
                      <Input {...field} id="kbis" placeholder="KBIS" isInvalid={!!(form.errors.kbis && form.touched.kbis)} />
                      <ErrorMessage name="kbis" component={FormErrorMessage} />
                    </FormControl>
                  )}
                </Field>
                <Button
                  type="submit"
                  isDisabled={!formik.dirty || !formik.isValid}
                  colorScheme="brand"
                >
                  Submit
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Card>
    </Flex>
  );
};

export default Enroll;
