import { RoomTypeType } from '#models/room_type'
import { Head } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'
import { Separator } from '~/lib/components/ui/separator'

type RoomInfo = RoomTypeType & { imgSrc: string; label: string; description: string }

const roomInfos: RoomInfo[] = [
  {
    id: 1,
    imgSrc: '/images/room_3.jpeg',
    name: 'SUPERIOR_TWIN',
    label: 'Superior Twin',
    areaSqMeter: 26,
    maxAdult: 2,
    maxChildren: 0,
    description:
      'Cozy and modern, the Superior Twin offers two single beds—perfect for friends or colleagues traveling together. Comes with all the essentials for a comfortable stay.',
  },
  {
    id: 2,
    imgSrc: '/images/room_3.jpeg',
    name: 'SUPERIOR_DOUBLE',
    label: 'Superior Double',
    areaSqMeter: 28,
    maxAdult: 2,
    maxChildren: 0,
    description:
      'Ideal for couples or solo travelers who like more space, the Superior Double features a plush double bed, stylish decor, and a relaxing atmosphere.',
  },
  {
    id: 3,
    imgSrc: '/images/room_1.jpg',
    name: 'DELUXE',
    label: 'Deluxe',
    areaSqMeter: 36,
    maxAdult: 2,
    maxChildren: 0,
    description:
      'Step up your stay in our Deluxe Room. Spacious and elegant, it includes a premium bed, a seating area, and a work desk—great for both relaxation and productivity.',
  },
  {
    id: 4,
    imgSrc: '/images/room_2.jpeg',
    name: 'SUITE',
    label: 'Suite',
    areaSqMeter: 56,
    maxAdult: 4,
    maxChildren: 0,
    description:
      'Our Suite is your home away from home. With separate living and sleeping areas, it’s designed for guests who value extra space, comfort, and a touch of luxury.',
  },
]

export default function RoomsPage() {
  return (
    <>
      <Head title="Home" />
      <MainLayout>
        {
          //<p className="text-center text-primary text-2xl uppercase tracking-wide">Rooms Page</p>
        }{' '}
        <div className="max-w-[900px] mx-auto">
          {roomInfos.map((roomType) => (
            <div key={roomType.id}>
              <p className="text-center text-xl tracking-widest text-primary">{roomType.label}</p>
              <div className="grid grid-cols-2 my-6">
                <img className="rounded-xl h-full w-full object-cover" src={roomType.imgSrc} />

                <div className="px-4 py-2 flex flex-col gap-2">
                  <p className="tracking-wide">{roomType.description}</p>
                  <p>Area Sqm: {roomType.areaSqMeter} sqm.</p>
                  <p>Max Adults: {roomType.maxAdult} persons</p>
                </div>
              </div>

              <Separator className="mx-40 my-8" />
            </div>
          ))}
        </div>
      </MainLayout>
    </>
  )
}
