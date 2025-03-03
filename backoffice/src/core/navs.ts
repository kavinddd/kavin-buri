import {
  DoorClosedIcon,
  LayoutDashboardIcon,
  LucideIcon,
  TicketIcon,
} from "lucide-react";

export interface NavConfig {
  key: string;
  label: string;
  url?: string;
  icon?: LucideIcon;
  subNavs?: NavConfig[];
  searchParams?: Record<string, string>;
}

const navs: NavConfig[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    url: "/",
    icon: LayoutDashboardIcon,
  },
  {
    key: "booking",
    label: "Booking",
    url: "/booking",
    icon: TicketIcon,
    subNavs: [
      {
        key: "booking-arrival",
        label: "Arrival",
        searchParams: { status: "arrival" },
      },
      {
        key: "booking-in-house",
        label: "In-house",
        searchParams: { status: "inHouse" },
      },
      {
        key: "booking-departure",
        label: "Departure",
        searchParams: { status: "departure" },
      },
    ],
  },
  {
    key: "room",
    label: "Room",
    url: "/room",
    icon: DoorClosedIcon,
  },
];

export default navs;
