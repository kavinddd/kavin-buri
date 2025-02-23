import { MainLayout } from '~/components/MainLayout'

export default function NotFound() {
  return (
    <>
      <MainLayout>
        <p className="text-primary font-bold text-center text-xl uppercase tracking-wide">
          Page not found
        </p>

        <p>We are sorry! the page you are looking for was not found.</p>
      </MainLayout>
    </>
  )
}
