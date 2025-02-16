import { SidebarProvider } from '~/lib/components/ui/sidebar'
import Footer from './Footer'
import Header from './Header'
import { ReactNode } from 'react'
import AppSidebar from './AppSidebar'

interface Props {
  children: ReactNode
}
export function MainLayout({ children }: Props) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="container mx-auto flex-grow px-4 sx:px-10 py-2 sm:py-6">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  )
}
