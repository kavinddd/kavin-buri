import { Head } from '@inertiajs/react'
import { MainLayout } from '~/components/MainLayout'

export default function AboutPage() {
  return (
    <>
      <Head title="Home" />
      <MainLayout>
        <p className="text-center text-primary text-2xl uppercase tracking-wide">About us</p>

        <div className="text-lg text-slate-800 flex flex-col gap-4">
          <p>
            Whether you’re planning your trip, need help with a booking, or just want to say hi —
            don’t hesitate to reach out.
          </p>
          <p>
            📍 Visit us Kavin Buri Green Hotel, 299/99 Pajaksinlapacom Rd, Tambon Mak Khaeng, Amphoe
            Mueang Udon Thani, Chang Wat Udon Thani 41000 Udon Thani, Thailand
          </p>
          <p>📞 Call us +66 92-123-4567</p>
          <p>✉️ Email us test@kavinburi.com </p>
          📱 Socials Follow us for updates, promos, and travel inspo: [Facebook] | [Instagram] |
          [Line]
        </div>
      </MainLayout>
    </>
  )
}
