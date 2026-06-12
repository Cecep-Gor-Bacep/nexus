"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignOutIcon } from "@phosphor-icons/react"
import { supabase } from "@/lib/supabase/client" // Pastikan path helper supabase Anda sudah benar

export function SidebarLogoutButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      // Eksekusi fungsi signOut dari Supabase
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Refresh halaman untuk mereset middleware/server state, lalu arahkan ke login
      router.refresh()
      router.push("/login")
    } catch (error: unknown) {
      console.error("Gagal melakukan log out:", (error as Error).message)
      setIsLoading(false)
    }
  }

  return (
    <Card className="gap-2 py-4 shadow-none border-sidebar-border bg-sidebar-background">
      <CardHeader className="px-4 py-0 pb-2">
        <CardTitle className="text-sm font-medium">Sesi Aplikasi</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Keluar dari sistem NexusVault secara aman.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-0 pt-2">
        <Button 
          variant="destructive"
          className="w-full gap-2 shadow-none text-white bg-destructive hover:bg-destructive/90"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <SignOutIcon className="size-4" />
          <span>{isLoading ? "Keluar..." : "Log Out"}</span>
        </Button>
      </CardContent>
    </Card>
  )
}