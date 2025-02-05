import { Link, usePage } from '@inertiajs/react'
import { ReactNode } from 'react'

export default function Header() {
  return (
    <div className="flex sm:pl-2 md:pl-20 pr-10 justify-between shadow-md">
      <Link href={'/'}>
        <Logo />
      </Link>
      <Navbar />
    </div>
  )
}

function Logo() {
  return <img src={'/images/logo.jpg'} alt="logo" className={'h-20 md:h-30 md:w-fit'} />
}

function Navbar() {
  const { url } = usePage()

  console.log(url)
  return (
    <>
      <nav className="flex justify-evenly flex-grow ">
        <NavLink href={'/about'} isActive={url === '/about'}>
          About
        </NavLink>
        <NavLink href={'/contact'} isActive={url === '/contact'}>
          Contact
        </NavLink>
        <NavLink href={'/booking'} isActive={url === '/booking'}>
          <button className="bg-orange-300 px-2 py-2 rounded-md">Book Now</button>
        </NavLink>
      </nav>
    </>
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
  const activeClassName = isActive ? 'font-bold' : ''

  return (
    <Link
      className={'xl uppercase hover:text-red-600 flex items-center ' + activeClassName}
      href={href}
    >
      {children}
    </Link>
  )
}
