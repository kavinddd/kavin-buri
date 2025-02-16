import { Head } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'

export default function AboutPage() {
  return (
    <>
      <Head title="Home" />
      <MainLayout>
        <p className="text-sand-500">Home page</p>
      </MainLayout>
    </>
  )
}
