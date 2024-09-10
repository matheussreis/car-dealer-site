import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from '@/components/ui/carousel';
import ImageWithFallback from '@/components/image-with-fallback';

interface VehicleCarouselProps {
  name: string;
  images: Array<string>;
}

export default function VehicleCarousel({
  name,
  images,
}: VehicleCarouselProps) {
  return (
    <div className="h-full">
      <Carousel className="rounded-lg overflow-hidden">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={`${image}-${index}`}>
              <div className="relative aspect-[500/350]">
                <ImageWithFallback
                  src={image}
                  alt={`${name} ${index + 1}`}
                  fallbackSrc="/placeholder.svg"
                  className="object-cover"
                  fill
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselControls />
      </Carousel>
    </div>
  );
}
