import { Head } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'

export default function Home() {
  return (
    <>
      <Head title="Home" />
      <MainLayout>
        <p className="text-sand-500">Home page</p>
      </MainLayout>
    </>
  )
}
