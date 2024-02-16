import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Select,
} from '@chakra-ui/react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { useEmployees } from '../../../hooks/useEmployees';
import { useShops } from '../../../hooks/useShops';

const CreateEmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  shop: Yup.string().required('Shop selection is required'),
});

const CreateEmployee = ({ onClose }: { onClose: any }) => {
  const { createEmployee } = useEmployees();
  const { shops } = useShops();
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        name: '',
        shop: '',
      }}
      validationSchema={CreateEmployeeSchema}
      onSubmit={async (values, actions) => {
        try {
          await createEmployee(values);
          toast({
            title: 'Employee created successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        } catch (error: any) {
          toast({
            title: 'Error creating employee',
            description: error.message, // Add a comma here
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="shop">Shop</FormLabel>
            <Select
              placeholder="Select a shop"
              onChange={(e) => setFieldValue('shop', e.target.value)}
            >
              {shops.map((shop) => (
                <option key={shop.id} value={shop['@id']}>
                  {shop.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <Field name="name">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!form.errors.name && !!form.touched.name}
                isRequired
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" placeholder="Name" />
              </FormControl>
            )}
          </Field>

          <Flex justify="flex-end">
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEmployee;
