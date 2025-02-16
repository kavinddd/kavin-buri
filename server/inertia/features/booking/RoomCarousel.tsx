import { useEffect, useState } from 'react'
import { AspectRatio } from '~/lib/components/ui/aspect-ratio'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/lib/components/ui/carousel'

export type RoomType = 'DELUXE' | 'STUDIO' | 'TWIN' | 'SUITE'

type RoomImage = {
  roomType: RoomType
  imageName: string
}

const ROOM_IMAGES: RoomImage[] = [
  {
    roomType: 'DELUXE',
    imageName: 'room_1.jpg',
  },
  {
    roomType: 'SUITE',
    imageName: 'room_2.jpeg',
  },
  {
    roomType: 'TWIN',
    imageName: 'room_3.jpeg',
  },
  // "STUDIO": "",
]

type Props = {
  onSelect: (roomType: RoomType) => void
}

export default function RoomCarousel({ onSelect }: Props) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      const selectedIndex = api.selectedScrollSnap()
      onSelect(ROOM_IMAGES[selectedIndex].roomType)
    })
  }, [api])

  return (
    <div>
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {ROOM_IMAGES.map((roomImage) => (
            <CarouselItem key={roomImage.roomType}>
              <AspectRatio ratio={16 / 9}>
                <div className="rounded-xl bg-black absolute h-full w-full opacity-30 z-10 hover:bg-transparent " />
                <img
                  className="rounded-xl h-full w-full object-cover"
                  src={`images/${roomImage.imageName}`}
                  alt={roomImage.imageName}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          disabled={false}
          className="h-6 w-6 lg:h-8 lg:w-8 rounded-full opacity-60 hover:opacity-80"
          type="button"
        />
        <CarouselNext
          disabled={false}
          className="h-6 w-6 lg:h-8 lg:w-8 rounded-full opacity-60 hover:opacity-80"
          type="button"
        />
      </Carousel>
    </div>
  )
}
