import { Head } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'

export default function ContactPage() {
  return (
    <>
      <Head title="Contact" />
      <MainLayout>
        <p className="text-center text-primary text-2xl uppercase tracking-wide">Contact us</p>

        <div className="text-lg text-slate-800 flex flex-col gap-4">
          <p className="font-medium">Where comfort meets nature.</p>

          <p>
            Welcome to <span className="text-primary">Kavin Buri Green Hotel </span>, your serene
            escape in the heart of Udon Thani.
          </p>
          <p>
            We’re not just another hotel — we’re your home away from home, designed for travelers
            who love modern comfort with a touch of nature.
          </p>
          <p>🌿 Eco-friendly vibes? Check.</p>
          <p>🛏️ Cozy rooms? Absolutely. </p>
          <p>📍 Close to everything? Yup — markets, temples, and nightlife are all within reach.</p>
          <p>
            Whether you're here to chill by the pool, explore the city, or just catch up on some
            well-earned rest, we’ve got you. Plus, our friendly staff is always down to help make
            your stay smooth and memorable.
          </p>
        </div>
      </MainLayout>
    </>
  )
}
