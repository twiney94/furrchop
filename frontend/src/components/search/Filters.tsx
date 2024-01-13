import { Button, Box } from "@chakra-ui/react";

const Filters = () => {
	return (
		<Box w="100%" bg="white" className="h-16 flex items-center px-8 py-4 gap-4 bg-brand-500">
			<Button colorScheme="brand" variant="outline">
				Button
			</Button>
			<Button colorScheme="teal" variant="outline">
				Button
			</Button>
			<Button colorScheme="teal" variant="outline">
				Button
			</Button>
		</Box>
	);
};

export default Filters;
