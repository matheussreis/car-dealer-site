import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createArrayFromRange(start: number, end: number) {
  const length = Math.abs(end - start) + 1;
  return Array.from({ length }, (_, index) => `${end + index}`);
}

export function createSteppedArray(start: number, end: number, step: number) {
  const length = Math.floor(Math.abs(end - start) / step) + 1;
  const direction = start <= end ? 1 : -1;

  return Array.from(
    { length: length },
    (_, index) => `${start + index * step * direction}`
  );
}
