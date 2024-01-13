import { Button, Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Filters = () => {
	return (
		<Box w="100%" bg="white" className="h-16 flex items-center px-8 py-4 gap-4 bg-brand-500">
			<Button leftIcon={<HamburgerIcon />} colorScheme="brand" variant="outline">
				Filters
			</Button>
			<Button colorScheme="teal" variant="outline" borderRadius="3xl">
				Dog Friendly
			</Button>
			<Button colorScheme="teal" variant="outline" borderRadius="3xl">
				Parking
			</Button>
		</Box>
	);
};

export default Filters;
