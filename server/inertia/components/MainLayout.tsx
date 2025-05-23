import { SidebarProvider } from '~/lib/components/ui/sidebar'
import Footer from './Footer'
import Header from './Header'
import { ReactNode, useEffect } from 'react'
import AppSidebar from './AppSidebar'
import { Toaster } from '~/lib/components/ui/sonner'
import { usePage } from '@inertiajs/react'
import { toast } from 'sonner'
import { SharedProps } from '@adonisjs/inertia/types'

interface Props {
  children: ReactNode
  backgroundSrc?: string
}

export function MainLayout({ children, backgroundSrc }: Props) {
  const { info, success, error, warning } = usePage<SharedProps>().props

  useEffect(() => {
    if (info) toast.info(info)
    if (success) toast.success(success)
    if (error) toast.error(error)
    if (warning) toast.warning(warning)
  }, [])

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
