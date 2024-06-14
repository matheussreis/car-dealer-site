import { SortingType } from '@/enums';
import { Vehicle } from '@/interfaces';

class Sorting {
  static ascendingNumber = (a: number, b: number) => a - b;

  static descendingNumber = (a: number, b: number) => b - a;

  static ascendingDate = (a: Date, b: Date) =>
    new Date(a).getTime() - new Date(b).getTime();

  static descendingDate = (a: Date, b: Date) =>
    new Date(b).getTime() - new Date(a).getTime();

  static ascendingText = (a: string, b: string) => a.localeCompare(b);

  static descendingText = (a: string, b: string) => b.localeCompare(a);
}

const SORTING_MAPPING: { [key in SortingType]: Function } = {
  [SortingType.AscendingPrice]: Sorting.ascendingNumber,
  [SortingType.DescendingPrice]: Sorting.descendingNumber,
  [SortingType.AscendingDate]: Sorting.ascendingDate,
  [SortingType.DescendingDate]: Sorting.descendingDate,
  [SortingType.AscendingName]: Sorting.ascendingText,
  [SortingType.DescendingName]: Sorting.descendingText,
  [SortingType.AscendingYear]: Sorting.ascendingNumber,
  [SortingType.DescendingYear]: Sorting.descendingNumber,
};

const FIELD_MAPPING: { [key in SortingType]: Function } = {
  [SortingType.AscendingPrice]: (vehicle: Vehicle) => vehicle.specs.price,
  [SortingType.DescendingPrice]: (vehicle: Vehicle) => vehicle.specs.price,
  [SortingType.AscendingDate]: (vehicle: Vehicle) => vehicle.dateEntered,
  [SortingType.DescendingDate]: (vehicle: Vehicle) => vehicle.dateEntered,
  [SortingType.AscendingName]: (vehicle: Vehicle) => vehicle.name,
  [SortingType.DescendingName]: (vehicle: Vehicle) => vehicle.name,
  [SortingType.AscendingYear]: (vehicle: Vehicle) => vehicle.specs.year,
  [SortingType.DescendingYear]: (vehicle: Vehicle) => vehicle.specs.year,
};

export default function getFunctionBySorting(sortingType: SortingType) {
  let sortFunction = SORTING_MAPPING[sortingType] || SORTING_MAPPING.descdate;
  let getField = FIELD_MAPPING[sortingType] || FIELD_MAPPING.descdate;

  return (list: Array<Vehicle>) => {
    return list.sort((a, b) => sortFunction(getField(a), getField(b)));
  };
}
