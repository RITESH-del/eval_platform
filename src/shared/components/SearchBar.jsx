import { TextInput } from "@mantine/core";
import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  ...props
}) {
  return (
    <TextInput
      value={value}
      onChange={(e) =>
        onChange?.(e.currentTarget.value)
      }
      placeholder={placeholder}
      leftSection={<Search size={18} />}
      radius="xl"
      flex={1}
      {...props}
    />
  );
}