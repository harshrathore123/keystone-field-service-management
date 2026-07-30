import TextField from "@mui/material/TextField";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

function SearchBar({
  value,
  placeholder = "Search...",
  onChange,
}: SearchBarProps) {
  return (
    <TextField
      fullWidth
      size="small"
      label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;