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

const SORTING_MAPPING: {
  [key in SortingType]: { sort: Function; getField: Function };
} = {
  [SortingType.AscendingPrice]: {
    sort: Sorting.ascendingNumber,
    getField: (vehicle: Vehicle) => vehicle.specs.price,
  },
  [SortingType.DescendingPrice]: {
    sort: Sorting.descendingNumber,
    getField: (vehicle: Vehicle) => vehicle.specs.price,
  },
  [SortingType.AscendingDate]: {
    sort: Sorting.ascendingDate,
    getField: (vehicle: Vehicle) => vehicle.dateEntered,
  },
  [SortingType.DescendingDate]: {
    sort: Sorting.descendingDate,
    getField: (vehicle: Vehicle) => vehicle.dateEntered,
  },
  [SortingType.AscendingName]: {
    sort: Sorting.ascendingText,
    getField: (vehicle: Vehicle) => vehicle.name,
  },
  [SortingType.DescendingName]: {
    sort: Sorting.descendingText,
    getField: (vehicle: Vehicle) => vehicle.name,
  },
  [SortingType.AscendingYear]: {
    sort: Sorting.ascendingNumber,
    getField: (vehicle: Vehicle) => vehicle.specs.year,
  },
  [SortingType.DescendingYear]: {
    sort: Sorting.descendingNumber,
    getField: (vehicle: Vehicle) => vehicle.specs.year,
  },
};

export default function getFunctionBySorting(sortingType: SortingType) {
  const sorting = SORTING_MAPPING[sortingType] || SORTING_MAPPING.descdate;
  const { sort, getField } = sorting;

  return (list: Array<Vehicle>) => {
    return list.sort((a, b) => sort(getField(a), getField(b)));
  };
}
