'use server';

import vehicles from '@/../../data.json';
import { Vehicle, VehicleSpecsFilter } from '@/interfaces';
import { SortingType } from '@/enums';
import { applyFilters } from '@/lib/filters';
import getFunctionBySorting from '@/lib/sorting';
import { notFound } from 'next/navigation';

export async function getVehicles(
  limit: number = 8,
  offset: number = 0,
  sortingType: SortingType = SortingType.DescendingDate,
  filters?: VehicleSpecsFilter
): Promise<{ vehicles: Vehicle[]; totalCount: number }> {
  let list = new Array<Vehicle>();
  let vehiclesList = [...vehicles] as Array<Vehicle>;

  const sortingFn = getFunctionBySorting(sortingType);
  sortingFn(vehiclesList);

  if (filters) {
    vehiclesList = applyFilters(filters, vehiclesList);
  }

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

export async function getVehicleById(id: string): Promise<Vehicle> {
  let vehiclesList = [...vehicles] as Array<Vehicle>;
  const vehicle = vehiclesList.find((vehicle) => vehicle.id === id);

  if (!vehicle) {
    notFound();
  }

  return vehicle;
}
