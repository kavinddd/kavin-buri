import { Link, usePage } from '@inertiajs/react'
import { navs } from '~/core/navconfig'
import { Sidebar, SidebarContent } from '~/lib/components/ui/sidebar'

export default function AppSidebar() {
  const { url } = usePage()

  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarContent className="p-4">
        <ul className="flex flex-col gap-4">
          {navs.map((nav) => (
            <li key={nav.url}>
              <Link href={nav.url}>{nav.label}</Link>
            </li>
          ))}
        </ul>
      </SidebarContent>
    </Sidebar>
  )
}
