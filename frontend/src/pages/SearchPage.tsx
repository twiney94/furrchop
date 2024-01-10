import { Box, Image, Badge } from "@chakra-ui/react";

const results = [
	{
		id: 1,
		image:
			"https://as2.ftcdn.net/v2/jpg/04/88/88/03/1000_F_488880354_jMajUoobcE4xFQIkMyycSNYJV3fwXEvW.jpg",
		title: "Chez Toutou",
		address: "123 rue du chien",
		rating: 4.5,
		reviews: 449,
		availabilities: [
			// Example, 4 availabilities for 11/01/2024
			{
				date: "11/01/2024",
				availabilities: [
					{
						start: "09:00",
						end: "10:00",
					},
					{
						start: "10:00",
						end: "11:00",
					},
					{
						start: "11:00",
						end: "12:00",
					},
					{
						start: "12:00",
						end: "13:00",
					},
				],
			},
		],
	},
	{
		id: 2,
		image:
			"https://as2.ftcdn.net/v2/jpg/04/88/88/03/1000_F_488880354_jMajUoobcE4xFQIkMyycSNYJV3fwXEvW.jpg",
		title: "Chez Médor",
		address: "123 rue du chien",
		rating: 4.5,
		reviews: 449,
		availabilities: [
			// Example, 4 availabilities for 11/01/2024
			{
				date: "11/01/2024",
				availabilities: [
					{
						start: "09:00",
						end: "10:00",
					},
					{
						start: "10:00",
						end: "11:00",
					},
					{
						start: "11:00",
						end: "12:00",
					},
					{
						start: "12:00",
						end: "13:00",
					},
				],
			},
		],
	},
];

const SearchPage = () => {
	const property = {
		imageUrl: "https://bit.ly/2Z4KKcF",
		imageAlt: "Rear view of modern home with pool",
		beds: 3,
		baths: 2,
		title: "Modern home in city center in the heart of historic Los Angeles",
		formattedPrice: "$1,900.00",
		reviewCount: 34,
		rating: 4,
	};

	return (
		<Box w="100%" h='100%' className="flex flex-col">
			<Box w="100%" bg="red.500" className="h-16">
				yp
			</Box>
			<Box w="100%" bg="blue.500" className="flex grow">
				<Box w="30%" borderWidth="1px" borderRadius="lg" overflow="hidden">
					hello
				</Box>
				<Box w="70%">ploi</Box>
			</Box>
		</Box>
	);
};
export default SearchPage;
