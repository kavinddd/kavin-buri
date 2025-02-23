import { Link, usePage } from '@inertiajs/react'
import { navs } from '~/core/navconfig'
import { Separator } from '~/lib/components/ui/separator'
import { Sidebar, SidebarContent } from '~/lib/components/ui/sidebar'

export default function AppSidebar() {
  const { url } = usePage()

  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarContent className="p-4">
        <ul className="flex flex-col gap-4">
          {navs.map((nav) => (
            <li key={nav.url} className="py-1">
              <Link href={nav.url}>&nbsp;{nav.label}</Link>
              <Separator />
            </li>
          ))}
        </ul>
      </SidebarContent>
    </Sidebar>
  )
}
