import {
  BadgeDollarSignIcon,
  BookUserIcon,
  DoorClosedIcon,
  LayoutDashboardIcon,
  LucideIcon,
  TentTreeIcon,
  TicketIcon,
  UserRoundCogIcon,
} from "lucide-react";
import { RoleNameType } from "./types";

export interface NavConfig {
  key: string;
  label: string;
  roles?: RoleNameType[];
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
    roles: ["ADMIN"],
  },
  {
    key: "booking",
    label: "Booking",
    url: "/booking",
    icon: TicketIcon,
    roles: ["ADMIN", "EDIT_BOOKING", "READ_BOOKING"],
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
          status: "CHECKED-IN",
        },
      },
    ],
  },
  {
    key: "room",
    label: "Room",
    url: "/room",
    icon: DoorClosedIcon,
    roles: ["ADMIN", "EDIT_ROOM", "READ_ROOM"],
  },
  {
    key: "guest",
    label: "Guest",
    url: "/guest",
    icon: TentTreeIcon,
    roles: ["ADMIN", "EDIT_GUEST", "READ_GUEST"],
  },
  {
    key: "pricing",
    label: "Pricing",
    url: "/pricing",
    icon: BadgeDollarSignIcon,
    roles: ["ADMIN", "EDIT_PRICING", "READ_PRICING"],
  },
  {
    key: "roleGroup",
    label: "Role Group",
    url: "/roleGroup",
    icon: UserRoundCogIcon,
    roles: ["ADMIN", "EDIT_ROLE_GROUP", "READ_ROLE_GROUP"],
  },
  {
    key: "user",
    label: "User",
    url: "/user",
    icon: BookUserIcon,
    roles: ["ADMIN", "EDIT_USER", "READ_USER"],
  },
];

export default navs;
