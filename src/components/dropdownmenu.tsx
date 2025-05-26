// src/components/CustomSelect.tsx (or .astro if using Astro components)

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  placeholder: string;
  options: Option[];
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export default function CustomSelect({ name, placeholder, options, onChange, defaultValue }: CustomSelectProps) {
  return (
    <div className="relative w-full">
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectScrollUpButton />
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm"
              >
                {option.label}
              </SelectItem>
            ))}
          </div>
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    </div>
  );
}