'use server';

import { getFunctionBySorting } from '@/lib/utils';
import vehicles from '../../../public/data.json';
import { Vehicle } from '@/types';
import { SortingType } from '@/enums';

export async function getVehicles(
  limit: number = 8,
  offset: number = 0,
  sortingType: SortingType = SortingType.DescendingDate
): Promise<{ vehicles: Vehicle[]; totalCount: number }> {
  let list = new Array<Vehicle>();
  let vehiclesList = [...vehicles] as Array<Vehicle>;

  const sortingFn = getFunctionBySorting(sortingType);
  sortingFn(vehiclesList);

  if (offset === 0) {
    list = vehiclesList.slice(offset, limit);
  } else {
    list = vehiclesList.slice(offset * limit, offset * limit + limit);
  }

  return {
    vehicles: list,
    totalCount: vehiclesList.length,
  };
}
