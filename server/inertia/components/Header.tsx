import { Link, usePage } from '@inertiajs/react'
import { ReactNode } from 'react'
import { Button } from '~/lib/components/ui/button'
import WideLogo from './WideLogo'
import { SidebarTrigger } from '~/lib/components/ui/sidebar'
import { navs } from '~/core/navconfig'

export default function Header() {
  return (
    <div className="flex px-4 md:px-20 justify-between shadow-md items-center ">
      <div className="h-14 sm:h-20">
        <Link href={'/'}>
          <WideLogo />
        </Link>
      </div>

      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="hidden md:block">
        <ButtonLink href={'/booking'}>Book</ButtonLink>
      </div>
      <div className="block md:hidden">
        <SidebarTrigger />
      </div>
    </div>
  )
}

function Navbar() {
  const { url } = usePage()

  return (
    <>
      <nav>
        <ul className="flex justify-center gap-10 lg:gap-20 items-center ">
          {navs
            .filter((nav) => nav.url !== '/booking')
            .map((nav) => (
              <li key={nav.url}>
                <NavLink href={nav.url} isActive={url === nav.url}>
                  {nav.label}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </>
  )
}

function ButtonLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className={'flex items-center tracking-wide uppercase text-sm '} href={href}>
      <Button className="shadow-md hover:opacity-80 uppercase font-medium tracking-wide">
        {children}
      </Button>
    </Link>
  )
}

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string
  children: ReactNode
  isActive: boolean
}) {
  const activeClassName = isActive ? 'underline' : ''

  return (
    <Link
      className={
        'flex items-center tracking-wider uppercase text-sm text-inherit ' + activeClassName
      }
      href={href}
    >
      {children}
    </Link>
  )
}
