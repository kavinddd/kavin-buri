import { Link, useLocation } from "react-router";
import { Separator } from "./ui/separator";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import navs from "@/core/navs";

export default function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="mt-2">
        <p className="text-center">Kavin Buri</p>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="p-2">
        <ul className="flex flex-col gap-2">
          {navs.map((nav) => (
            <>
              <li
                key={nav.url}
                className={cn(
                  "p-1 hover:pl-4 ",
                  pathname === nav.url &&
                    "bg-primary pl-4 text-primary-foreground",
                )}
              >
                <Link
                  to={nav.url}
                  // className={cn(
                  //   pathname === nav.url &&
                  //     "bg-primary text-primary-foreground ",
                  // )}
                >
                  <nav.icon />
                  {nav.label}
                </Link>
              </li>
              <Separator />
            </>
          ))}
        </ul>
      </SidebarContent>
    </Sidebar>
  );
}
// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string
//     url: string
//     icon?: LucideIcon
//     isActive?: boolean
//     items?: {
//       title: string
//       url: string
//     }[]
//   }[]
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>
//       <SidebarMenu>
//         {items.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton tooltip={item.title}>
//                   {item.icon && <item.icon />}
//                   <span>{item.title}</span>
//                   <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>
//               <CollapsibleContent>
//                 <SidebarMenuSub>
//                   {item.items?.map((subItem) => (
//                     <SidebarMenuSubItem key={subItem.title}>
//                       <SidebarMenuSubButton asChild>
//                         <a href={subItem.url}>
//                           <span>{subItem.title}</span>
//                         </a>
//                       </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                   ))}
//                 </SidebarMenuSub>
//               </CollapsibleContent>
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   )
// }
