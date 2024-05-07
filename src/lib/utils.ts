import { SortingType } from '@/enums';
import { Vehicle } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFunctionBySorting(sortingType: SortingType) {
  switch (sortingType) {
    case SortingType.AscendingDate:
      return (list: Array<Vehicle>) => {
        return list.sort(
          (a, b) =>
            new Date(a.dateEntered).getTime() -
            new Date(b.dateEntered).getTime()
        );
      };
    case SortingType.AscendingPrice:
      return (list: Array<Vehicle>) => {
        return list.sort((a, b) => {
          const priceA = `${a.specs.price}`.replace(/,/g, '');
          const priceB = `${b.specs.price}`.replace(/,/g, '');
          return parseFloat(priceA) - parseFloat(priceB);
        });
      };
    case SortingType.AscendingName:
      return (list: Array<Vehicle>) => {
        return list.sort((a, b) => a.name.localeCompare(b.name));
      };
    case SortingType.DescendingPrice:
      return (list: Array<Vehicle>) => {
        return list.sort((a, b) => {
          const priceA = `${a.specs.price}`.replace(/,/g, '');
          const priceB = `${b.specs.price}`.replace(/,/g, '');
          return parseFloat(priceB) - parseFloat(priceA);
        });
      };
    case SortingType.DescendingName:
      return (list: Array<Vehicle>) => {
        return list.sort((a, b) => b.name.localeCompare(a.name));
      };
    default:
    case SortingType.DescendingDate:
      return (list: Array<Vehicle>) => {
        return list.sort(
          (a, b) =>
            new Date(b.dateEntered).getTime() -
            new Date(a.dateEntered).getTime()
        );
      };
  }
}
