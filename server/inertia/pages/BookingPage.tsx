import { Head, useForm } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'

export default function BookingPage() {
  const { data, setData } = useForm()

  console.log(data)
  return (
    <>
      <Head title="Home" />
      <MainLayout>
        <form></form>
      </MainLayout>
    </>
  )
}
