import Footer from './Footer'
import Header from './Header'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
