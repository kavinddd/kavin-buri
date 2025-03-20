import { Outlet, useLocation } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import { Card, CardContent, CardHeader } from "../ui/card";
import navs from "@/core/navs";

export default function MainLayout() {
  const { pathname } = useLocation();

  const title = navs.find((it) => pathname.startsWith(it.url!))?.label || "";

  return (
    <div className="bg-accent">
      <SidebarProvider>
        <AppSidebar />
        <main className="py-2 pr-2 w-full">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <p className="text-xl tracking-wide text-accent-foreground ">
                  {title}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </main>
      </SidebarProvider>
    </div>
  );
}
