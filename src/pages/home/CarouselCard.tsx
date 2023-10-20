import { Image } from "@nextui-org/react";

interface HomeCardProps {
  imagePath: string;
}

export default function CarouselCard({ imagePath }: HomeCardProps) {
  return (
    <div className="flex items-center justify-center h-70">
      <Image isBlurred width={400} height={200} src={imagePath} />
    </div>
  );
}
