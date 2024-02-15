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
import { useServices } from '../../../hooks/useServices';
import { useShops } from '../../../hooks/useShops';

const servicesSuggestions = [
  'Groomer',
  'Haircut',
  'Special services',
  'Nail trimming',
  'Bathing',
  'Teeth cleaning',
  'Ear cleaning',
  'Anal gland expression',
  'Flea bath',
  'Deshedding',
  'Furminator',
];

const CreateServiceSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required'),
  duration: Yup.number()
    .typeError('Duration must be a number')
    .required('Duration is required'),
  description: Yup.string().required('Description is required'),
  shop: Yup.string().required('Shop selection is required'),
});

const CreateService = ({ onClose }) => {
  const { createService } = useServices();
  const { shops } = useShops();
  const toast = useToast();

  return (
    <Formik
      initialValues={{
        name: '',
        price: '',
        duration: '',
        description: '',
        shop: '',
      }}
      validationSchema={CreateServiceSchema}
      onSubmit={async (values, actions) => {
        try {
          const payload = {
            ...values,
            price: parseFloat(values.price),
            duration: parseInt(values.duration, 10),
          };
          await createService(payload);
          toast({
            title: 'Service created successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          onClose();
        } catch (error) {
          toast({
            title: 'Error creating service',
            description: error.message,
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

          {/* Service Name Select */}
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="name">Service Name</FormLabel>
            <Field name="name">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.name && !!form.touched.name}
                  isRequired
                >
                  <Select {...field} id="name" placeholder="Select a service">
                    {servicesSuggestions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Field name="price">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.price && !!form.touched.price}
                  isRequired
                >
                  <Input
                    {...field}
                    id="price"
                    type="number"
                    placeholder="Price"
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="duration">Duration</FormLabel>
            <Field name="duration">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={!!form.errors.duration && !!form.touched.duration}
                  isRequired
                >
                  <Input
                    {...field}
                    id="duration"
                    type="integer"
                    placeholder="Duration"
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Field name="description">
              {({ field, form }: FieldProps) => (
                <FormControl
                  isInvalid={
                    !!form.errors.description && !!form.touched.description
                  }
                  isRequired
                >
                  <Input
                    {...field}
                    id="description"
                    placeholder="Description"
                  />
                </FormControl>
              )}
            </Field>
          </FormControl>
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

export default CreateService;
