'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import { VehicleSpecRangeFilter } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { LuX } from 'react-icons/lu';

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
  const t = useTranslations('pages.vehicles.buttons.filters');

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
            <SelectValue placeholder={t('from')} />
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
            <SelectValue placeholder={t('to')} />
          </SelectTrigger>
          <SelectContent id={`${name}-to`}>
            {[...range].reverse().map((item) => (
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
  const t = useTranslations('pages.vehicles.buttons.filters');

  const [selectValue, setSelectValue] = useState<string>(value || '');

  useEffect(() => {
    if (typeof value === 'string') {
      setSelectValue(value);
    }
  }, [value]);

  const clearSelectHandler = () => {
    setSelectValue('');
    onSelect(name || id, '');
  };

  return (
    <FilterField label={label} name={name || id}>
      <div className="relative">
        <Select
          onValueChange={(value) => onSelect(name || id, value)}
          value={selectValue}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('select')} />
          </SelectTrigger>
          <SelectContent id={id}>
            {Object.keys(options).map((option) => (
              <SelectItem key={option} value={option}>
                {options[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectValue && (
          <span
            onClick={() => clearSelectHandler()}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-primary"
          >
            <LuX />
          </span>
        )}
      </div>
    </FilterField>
  );
}

interface RangeInputFilterProps {
  label: string;
  name: string;
  onChange: (name: string, value: string | object) => void;
  value?: VehicleSpecRangeFilter;
}

export function RangeInputFilter({
  label,
  name,
  onChange,
  value,
}: RangeInputFilterProps) {
  const t = useTranslations('pages.vehicles.buttons.filters');

  const [fieldValue, setFieldValue] = useState<VehicleSpecRangeFilter>(
    value || { from: '', to: '' }
  );

  useEffect(() => {
    if (value) {
      setFieldValue(value);
    }
  }, [value]);

  const changeInputHandler = (src: string, value: string) => {
    setFieldValue((prev) => ({ ...prev, [src]: value }));
    onChange(name, { [src]: value });
  };

  return (
    <FilterField label={label} name={name}>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative w-full max-w-sm">
          <Input
            type="number"
            name={`${name}-from`}
            placeholder={t('from')}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={fieldValue?.from}
            onChange={(e) => changeInputHandler('from', e.target.value)}
          />
          {fieldValue?.from && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              onClick={() => setFieldValue((prev) => ({ ...prev, from: '' }))}
            >
              <LuX />
            </button>
          )}
        </div>
        <div className="relative w-full max-w-sm">
          <Input
            type="number"
            name={`${name}-to`}
            placeholder={t('to')}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={fieldValue?.to}
            onChange={(e) => changeInputHandler('to', e.target.value)}
          />
          {fieldValue.to && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              onClick={() => setFieldValue((prev) => ({ ...prev, to: '' }))}
            >
              <LuX />
            </button>
          )}
        </div>
      </div>
    </FilterField>
  );
}
