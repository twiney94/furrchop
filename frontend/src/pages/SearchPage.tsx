import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SearchResult {
    id: number;
    title: string;
}

const results = [
    {
        id: 1,
        title: "First Post",
    },
    {
        id: 2,
        title: "Second Post",
    },
    {
        id: 3,
        title: "Third Post",
    },
];

const SearchPage = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

	const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// const results = await search(searchValue);
		setSearchResults(results);
	};

	return (
		<div>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
			<ul>
				{searchResults.map((result) => (
					<li key={result.id}>
						<Link to={`/posts/${result.id}`}>{result.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
export default SearchPage;