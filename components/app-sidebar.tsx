"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { SidebarLogoutButton } from "@/components/sidebar-opt-in-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { RowsIcon } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./theme-toggle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Eksekusi fungsi signOut dari Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Refresh halaman untuk mereset middleware/server state, lalu arahkan ke login
      router.refresh();
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Gagal melakukan log out:", error.message);
      }
      setIsLoading(false);
    }
  };

  const data = {
    navMain: [
      {
        title: "Contents",
        url: "#",
        items: [
          {
            title: "File Manager",
            url: "#",
          },
          {
            title: "GPIO Control",
            url: "#",
          },
        ],
      },
      {
        title: "Account",
        url: "#",
        items: [
          {
            title: "Reset Password",
            url: "#",
          },
          {
            title: "Log Out",
            onClick: handleLogout,
          },
        ],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <RowsIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-large">Nexus Vault</span>
                  <span className="">Beta</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <ModeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
