interface VehicleDetailsPageProps {
  params: { id: string };
}

export default async function VehicleDetailsPage({
  params: { id },
}: VehicleDetailsPageProps) {
  return <p>Vehicle Details Page</p>;
}
