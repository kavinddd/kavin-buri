import { Head } from '@inertiajs/react'
import Test from '~/components/test'

export default function Home() {
  return (
    <>
      <Head title="Home" />
      <Test>
        <p className="text-sand-500">Hello World!</p>
      </Test>
    </>
  )
}
