export interface Vehicle {
  id: string;
  dateEntered: string;
  name: string;
  description: string;
  imageSrc: string;
  specs: {
    horsePower: number;
    mileage: number;
    price: number;
    fuelType: string;
    bodyType: string;
    engine: number;
    gearbox: string;
    seats: number;
    doors: number;
    brand: string;
    origin: string;
    drivetrain: string;
    year: number;
  };
  features: Array<string>;
}

export interface VehicleSpecRangeFilter {
  from?: string;
  to?: string;
}

export interface VehicleSpecsFilter {
  [key: string]: string | VehicleSpecRangeFilter;
  mileage: VehicleSpecRangeFilter;
  year: VehicleSpecRangeFilter;
  bodyTypes: string;
  fuelTypes: string;
  gearbox: string;
  brands: string;
  origin: string;
  drivetrain: string;
}
