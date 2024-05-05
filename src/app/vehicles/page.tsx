interface VehiclesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function VehiclesPage({ searchParams }: VehiclesPageProps) {
  return <p>Vehicles Page</p>;
}
