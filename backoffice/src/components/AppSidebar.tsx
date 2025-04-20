import {
  createSearchParams,
  Link,
  useLocation,
  useSearchParams,
} from "react-router";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubItem,
  useSidebar,
} from "./ui/sidebar";
import { cn } from "@/lib/utils";
import navs from "@/core/navs";
import React, { useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronsUpDown, LogOutIcon, UserIcon } from "lucide-react";
import { useUser } from "@/features/users/UserProvider";

export default function AppSidebar() {
  const { state } = useSidebar();
  const { pathname } = useLocation();
  const [searchParams, _] = useSearchParams();
  const { user, logout } = useUser();

  const { roles } = user!;

  console.log(roles);

  const accessibleNavs = useMemo(() => {
    return navs.filter(({ roles: requiredRoles }) =>
      requiredRoles?.some((role) => roles.includes(role)),
    );
  }, [roles]);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="bg-primary text-primary-foreground">
        <SidebarMenu>
          <SidebarMenuItem>
            <p className="text-center tracking-wide">
              {state === "collapsed" ? "K" : "Kavin Buri BO"}
            </p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="p-2">
        <SidebarMenu className="flex flex-col gap-2">
          {accessibleNavs.map((nav) => (
            <React.Fragment key={nav.url}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={nav.url ?? "/"}>
                    {nav.icon && (
                      <nav.icon
                        className={cn(
                          pathname.startsWith(nav.url!) && "text-primary",
                        )}
                      />
                    )}
                    <p>{nav.label}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {nav.subNavs &&
                state === "expanded" &&
                nav.subNavs.map((subNav) => (
                  <SidebarMenuSubItem key={subNav.key}>
                    <Link
                      to={`${nav.url}?${createSearchParams(subNav.searchParams).toString()}`}
                    >
                      <p
                        className={cn(
                          "text-end text-sm hover:text-primary text-muted-foreground",
                          nav.url === pathname &&
                            (subNav.searchParams !== undefined
                              ? Object.entries(subNav.searchParams).every(
                                  ([key, value]) =>
                                    searchParams.has(key, value),
                                )
                              : true) &&
                            "text-primary",
                        )}
                      >
                        {subNav.label}
                      </p>
                    </Link>
                  </SidebarMenuSubItem>
                ))}

              <Separator />
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <UserIcon />
                  <p className=" overflow-ellipsis whitespace-nowrap overflow-hidden uppercase tracking-wider">
                    {user?.username ?? "Username"}
                  </p>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-2"
              >
                {
                  // <DropdownMenuGroup>
                  //   <DropdownMenuItem>TEST</DropdownMenuItem>
                  // </DropdownMenuGroup>
                  //
                  // <DropdownMenuSeparator />
                  //
                  // <DropdownMenuGroup>
                  //   <DropdownMenuItem>TEST</DropdownMenuItem>
                  // </DropdownMenuGroup>
                  //
                  // <DropdownMenuSeparator />
                  //
                  // <DropdownMenuGroup>
                  //   <DropdownMenuItem>TEST</DropdownMenuItem>
                  // </DropdownMenuGroup>
                  //
                  // <DropdownMenuSeparator />
                }

                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={logout}>
                    <LogOutIcon />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
