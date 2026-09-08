import { Center, Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
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
					fontFamily="accentFont"
					placeholder="Search movies & TV shows"
					css={{ "--focus-color": "lime" }}
					_placeholder={{ color: "paleLavender" }}
					value={value}
					onChange={(event) => onChange(event.target.value)}
				/>
			</InputGroup>
		</Center>
	);
}

export default SearchBar;
