'use server';

import fs from 'fs';
import { promises } from 'fs';
import { Vehicle, VehicleSpecsFilter } from '@/interfaces';
import { SortingType } from '@/enums';
import { applyFilters } from '@/lib/filters';
import getFunctionBySorting from '@/lib/sorting';
import { notFound } from 'next/navigation';

async function fetchVehicles(): Promise<Vehicle[]> {
  const filePath = `${process.cwd()}/data.json`;

  if (fs.existsSync(filePath) === false) {
    await promises.writeFile(filePath, '[]', { encoding: 'utf-8' });
  }

  const file = await promises.readFile(filePath, 'utf8');
  const vehicles = JSON.parse(file);
  return vehicles as Vehicle[];
}

export async function getVehicles(
  limit: number = 8,
  offset: number = 0,
  sortingType: SortingType = SortingType.DescendingDate,
  filters?: VehicleSpecsFilter
): Promise<{ vehicles: Vehicle[]; totalCount: number }> {
  let list = new Array<Vehicle>();
  let vehiclesList = await fetchVehicles();

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
  let vehiclesList = await fetchVehicles();
  const vehicle = vehiclesList.find((vehicle) => vehicle.id === id);

  if (!vehicle) {
    notFound();
  }

  return vehicle;
}

export async function getVehicleYearRange() {
  let list = await fetchVehicles();

  let newest = 0;
  let oldest = new Date().getFullYear();

  list.forEach((vehicle) => {
    if (vehicle.specs.year > newest) {
      newest = vehicle.specs.year;
    }

    if (vehicle.specs.year < oldest) {
      oldest = vehicle.specs.year;
    }
  });

  return { newest, oldest };
}
