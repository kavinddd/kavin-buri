import { Head, Link } from '@inertiajs/react'
import { MoveRightIcon } from 'lucide-react'
import { MainLayout } from '~/components/MainLayout'

export default function HomePage() {
  return (
    <>
      <Head title="Home" />
      <MainLayout backgroundSrc={'/images/hero-home.jpg'}>
        <div
          className="gap-2 animate-fade-in-up  bg-black bg-opacity-20 hover:bg-opacity-40 p-16
          flex min-w-80  max-w-[800px] mx-auto my-auto "
        >
          <div className="flex-1 ">
            <p className="flex justify-center align-center h-full text-9xl text-primary-foreground tracking-wideest">
              Escape. Relax. Reconnect.
            </p>

            <div className="flex">
              <p className="text-white text-xl">
                Your perfect getaway awaits — book your stay with us today.
              </p>
            </div>
          </div>
          <div className="flex text-gray-300 items-center hover:text-primary font-bold hover:cursor-pointer">
            <Link href={'/booking'}>
              <MoveRightIcon />
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  )
}
