import { Head } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'

export default function HomePage() {
  return (
    <>
      <Head title="Home" />
      <MainLayout backgroundSrc={'/images/hero-home.jpg'}>
        <p className="animate-fade-in-up flex justify-center align-center h-full text-3xl text-primary-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum
        </p>
      </MainLayout>
    </>
  )
}
