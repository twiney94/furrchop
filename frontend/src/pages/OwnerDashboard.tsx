import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  LinkBox,
  LinkOverlay,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useBookings } from "../hooks/useBookings";
import * as Yup from "yup";
import { Formik, Form, useFormik } from "formik";
import { MultiSelect } from "chakra-multiselect";
import { httpCall } from "../services/http";

export const OwnerDashboard = () => {
  const { getOwnerShops } = useBookings();
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRange, setSelectedRange] = useState([6, 23]);
  const options = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];
  const toast = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string(),
    open_hours: Yup.object({
      beginning: Yup.string().required("Beginning time is required"),
      end: Yup.string().required("End time is required"),
    }),

    open_days: Yup.array().of(Yup.string().required("Required")),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      open_hours: { beginning: "", end: "" },
      open_days: [],
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const transformedOpenDays = (values.open_days as { value: string }[]).map(
        (day) => (typeof day === "object" ? day.value : day)
      );

      const openHours = transformedOpenDays.map((day) => ({
        day,
        beginning: values.open_hours.beginning,
        end: values.open_hours.end,
      }));

      const submissionValues = {
        ...values,
        openDays: transformedOpenDays,
        openHours: openHours,
      };

      createShop(submissionValues);
      getOwnerShops();

      onClose();
      console.log(submissionValues);
    },
  });

  const fetchShops = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getOwnerShops();
      setStores(data as any);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error fetching shops",
        description: "Unable to load shops data.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [getOwnerShops, toast]);

  const createShop = async (values: {
    openDays: string[];
    openHours: { day: string; beginning: string; end: string }[];
    name: string;
    description: string;
    open_hours: { beginning: string; end: string };
    open_days: never[];
    address: string;
  }) => {
    setLoading(true);
    try {
      await httpCall("POST", "shops", values);
      // Assuming the POST operation is asynchronous
      await fetchShops(); // Re-fetch shops after successful creation
      toast({
        title: "Shop created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to create shop",
        description: "The shop could not be created.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleOpenDaysChange = (selectedOptions: any[]) => {
    if (!selectedOptions) return;

    const days = selectedOptions.map((option) => {
      if (option && typeof option === "object")
        return option.value.replace(/"/g, ""); // Additional check and cleanup
      return option; // Fallback or alternative handling
    });
    formik.setFieldValue("open_days", days);
    console.log(formik);
  };

  // Define the openAddShopModal function
  const openAddShopModal = () => {
    onOpen();
  };

  const sliderValueToTime = (value: number) => {
    const hours = Math.floor(value);
    const minutes = (value % 1) * 60 === 0 ? "00" : "30";
    return `${hours.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleRangeChange = (value: number[]) => {
    setSelectedRange(value); // Update local state for display
    const [beginning, end] = value.map(sliderValueToTime);
    formik.setFieldValue("open_hours.beginning", beginning);
    formik.setFieldValue("open_hours.end", end);
  };

  return (
    <Box className="flex justify-center h-full bg-slate-100 py-8">
      <Grid
        minH={"100%"}
        maxH={"100%"}
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        w="70%"
      >
        <GridItem colSpan={1} overflow="hidden"></GridItem>
        <GridItem colSpan={4}>
          <Box>
            <Heading as="h1" size="xl" mb={4} fontWeight={500}>
              My Shops
            </Heading>
            {loading && <Spinner />}
            {!loading && stores.length > 0 ? (
              <SimpleGrid columns={2} spacing={4}>
                {stores.map((store) => (
                  <LinkBox
                    as="article"
                    maxW="sm"
                    p="5"
                    borderWidth="1px"
                    rounded="md"
                    background={"brand.200"}
                    key={store.id} // Ensure to add a key for list items
                    onClick={() => console.log("hello")}
                  >
                    {store.name}
                  </LinkBox>
                ))}
                <LinkBox
                  as="article"
                  maxW="sm"
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  background={"brand.200"}
                  onClick={openAddShopModal}
                >
                  <LinkOverlay href="#">Add a new shop</LinkOverlay>
                </LinkBox>
              </SimpleGrid>
            ) : (
              !loading && <Text>No stores yet.</Text> // This line will be shown if there are no stores and not loading
            )}
          </Box>
        </GridItem>
      </Grid>

      {/* Modal for adding a new shop */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Shop</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                description: "",
                open_days: [],
                address: "",
              }}
              onSubmit={(values) => {
                console.log(values);
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                description: Yup.string(),
                open_days: Yup.array().required("Required"),
                address: Yup.string().required("Required"),
              })}
            >
              <Form onSubmit={formik.handleSubmit}>
                <FormControl
                  isInvalid={formik.touched.name && !!formik.errors.name}
                >
                  <FormLabel htmlFor="name">Shop Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Enter shop name"
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.description && !!formik.errors.description
                  }
                  mt={4}
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    placeholder="Enter description"
                  />
                  <FormErrorMessage>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.open_days && !!formik.errors.open_days
                  }
                  mt={4}
                >
                  <FormLabel htmlFor="open_days">Open Days</FormLabel>
                  <MultiSelect
                    options={options}
                    value={formik.values.open_days}
                    onChange={(selectedOptions) =>
                      handleOpenDaysChange(
                        Array.isArray(selectedOptions)
                          ? selectedOptions
                          : [selectedOptions]
                      )
                    }
                  />
                  <FormErrorMessage>{formik.errors.open_days}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel htmlFor="open_hours">Open Hours</FormLabel>
                  <Text>
                    From {sliderValueToTime(selectedRange[0])} to{" "}
                    {sliderValueToTime(selectedRange[1])}
                  </Text>
                  <RangeSlider
                    aria-label={["min", "max"]}
                    defaultValue={[6, 23]}
                    min={6}
                    max={23}
                    step={0.5} // Represents 30 minutes
                    onChangeEnd={handleRangeChange}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                </FormControl>

                <FormControl
                  isInvalid={formik.touched.address && !!formik.errors.address}
                  mt={4}
                >
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <Input
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    placeholder="Enter address"
                  />
                  <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                </FormControl>

                <Box mt={4}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={formik.isSubmitting}
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OwnerDashboard;
