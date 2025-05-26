import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectWrapperProps {
  name: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
  className?: string;
  disabled?: boolean;
}

export function SelectWrapper({
  name,
  placeholder,
  options,
  onChange,
  value,
  defaultValue,
  className = "",
  disabled = false,
}: SelectWrapperProps) {
  return (
    <Select
      name={name}
      onValueChange={onChange}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectWrapper;
