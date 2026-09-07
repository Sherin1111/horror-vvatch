import { Button, Center, Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	onSearch: () => void;
}

function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
	return (
		<Center padding="20px">
			<InputGroup
				background="transparent"
				color="paleLavender"
				flex="1"
				startElement={<LuSearch />}>
				<Input
					border="1px solid"
					borderColor="purple"
					fontFamily="mainFont"
					placeholder="Search movies & TV shows"
					css={{ "--focus-color": "lime" }}
					_placeholder={{ color: "paleLavender" }}
					value={value}
					onChange={(event) => onChange(event.target.value)}
				/>
			</InputGroup>
			<Button
				onClick={onSearch}
				bg="purple"
				border="1px solid"
				borderColor="paleLavender"
				_hover={{ bg: "pink" }}>
				Search
			</Button>
		</Center>
	);
}

export default SearchBar;
