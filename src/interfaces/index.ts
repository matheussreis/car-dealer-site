export interface Vehicle {
  [key: string]: string | VehicleSpecs | Array<string>;
  id: string;
  dateEntered: string;
  name: string;
  description: string;
  cover: string;
  specs: VehicleSpecs;
  images: Array<string>;
}

export interface VehicleSpecs {
  horsePower: number;
  mileage: number;
  price: number;
  fuelType: string;
  bodyType: string;
  engine: string;
  gearbox: string;
  seats: number;
  doors: number;
  brand: string;
  origin: string;
  drivetrain: string;
  year: number;
  color: string;
  wheelSize: number;
  previousOwners: number;
  co2Emissions: number;
  warranty: number;
}

export interface VehicleSpecRangeFilter {
  from?: string;
  to?: string;
}

export interface VehicleSpecsFilter {
  [key: string]: string | VehicleSpecRangeFilter;
  mileage: VehicleSpecRangeFilter;
  year: VehicleSpecRangeFilter;
  bodyType: string;
  fuelType: string;
  gearbox: string;
  brand: string;
  origin: string;
  drivetrain: string;
}

export interface VehicleSpecItem {
  name: string;
  label: string;
  value: string;
}
