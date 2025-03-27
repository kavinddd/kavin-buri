import { SidebarProvider } from '~/lib/components/ui/sidebar'
import Footer from './Footer'
import Header from './Header'
import { ReactNode } from 'react'
import AppSidebar from './AppSidebar'
import { Toaster } from '~/lib/components/ui/sonner'
import { usePage } from '@inertiajs/react'
import { toast } from 'sonner'

interface Props {
  children: ReactNode
  backgroundSrc?: string
}

export function MainLayout({ children, backgroundSrc }: Props) {
  const { flash } = usePage().props

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full">
        <Header />

        <div className="relative flex-grow">
          <main className="relative container mx-auto px-4 sx:px-10 py-2 sm:py-6 z-20 h-full flex flex-col gap-2 md:gap-6">
            {children}
          </main>
          {backgroundSrc && (
            <>
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `url(${backgroundSrc}) center`,
                  backgroundSize: 'cover',
                  objectFit: 'cover',
                }}
              ></div>

              <div className="absolute inset-0 z-10 bg-black opacity-50" />
            </>
          )}
        </div>
        <Toaster richColors expand theme="light" />

        <Footer />
      </div>
    </SidebarProvider>
  )
}
