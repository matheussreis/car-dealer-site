'use client';

import { Label } from '@/components/ui/label';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import { VehicleSpecRangeFilter } from '@/interfaces';

interface FilterFieldProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

export function FilterField({ label, name, children }: FilterFieldProps) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {children && children}
    </div>
  );
}

interface RangeFilterProps {
  label: string;
  name: string;
  range: Array<string>;
  onSelect: (name: string, value: string | object) => void;
  value: VehicleSpecRangeFilter;
}

export function RangeFilter({
  label,
  name,
  range,
  onSelect,
  value,
}: RangeFilterProps) {
  const selectFilterHandler = (src: string, value: string) => {
    onSelect(name, { [src]: Number(value) });
  };

  return (
    <FilterField label={label} name={name}>
      <div className="grid grid-cols-2 gap-2">
        <Select
          onValueChange={(value) => selectFilterHandler('from', value)}
          value={value.from?.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="From" />
          </SelectTrigger>
          <SelectContent id={`${name}-from`}>
            {range.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => selectFilterHandler('to', value)}
          value={value.to?.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="To" />
          </SelectTrigger>
          <SelectContent id={`${name}-to`}>
            {range.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FilterField>
  );
}

interface SelectFilterProps {
  id: string;
  label: string;
  name?: string;
  options: { [key: string]: string };
  onSelect: (name: string, value: string | object) => void;
  value?: string;
}

export function SelectFilter({
  id,
  label,
  name,
  options,
  onSelect,
  value,
}: SelectFilterProps) {
  return (
    <FilterField label={label} name={name || id}>
      <Select
        onValueChange={(value) => onSelect(name || id, value)}
        value={value}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent id={id}>
          {Object.keys(options).map((option) => (
            <SelectItem key={option} value={option}>
              {options[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FilterField>
  );
}
