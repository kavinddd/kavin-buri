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
    url: "/dashboard",
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
        searchParams: {
          checkInToday: "true",
          status: "RESERVED",
        },
      },
      {
        key: "booking-in-house",
        label: "In-house",
        searchParams: {
          status: "CHECKED-IN",
        },
      },
      {
        key: "booking-departure",
        label: "Departure",
        searchParams: {
          checkOutToday: "true",
          status: "CHECKED-OUT",
        },
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
