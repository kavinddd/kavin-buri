import { Link } from "react-router";
import { Separator } from "./ui/separator";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { ReactNode } from "react";
import { LayoutDashboardIcon } from "lucide-react";

interface NavConfig {
  label: string;
  url: string;
  icon: ReactNode;
}

const navs: NavConfig[] = [
  {
    label: "Dashboard",
    url: "/",
    icon: <LayoutDashboardIcon />,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" title="Test" variant="floating">
      <SidebarHeader></SidebarHeader>
      <SidebarContent className="p-4">
        <ul className="flex flex-col gap-4">
          {navs.map((nav) => (
            <li key={nav.url} className="py-1">
              <Link to={nav.url}>&nbsp;{nav.label}</Link>
              <Separator />
            </li>
          ))}
        </ul>
      </SidebarContent>
    </Sidebar>
  );
}
