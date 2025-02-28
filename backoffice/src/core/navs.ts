import {
  DoorClosedIcon,
  LayoutDashboardIcon,
  LucideIcon,
  TicketIcon,
} from "lucide-react";

export interface NavConfig {
  label: string;
  url: string;
  icon: LucideIcon;
}

const navs: NavConfig[] = [
  {
    label: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Booking",
    url: "/booking",
    icon: TicketIcon,
  },
  {
    label: "Room",
    url: "/room",
    icon: DoorClosedIcon,
  },
];

export default navs;
