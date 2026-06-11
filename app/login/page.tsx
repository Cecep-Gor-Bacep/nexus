"use client";

import { LoginForm } from "@/components/login-form"
import { RowsIcon } from "@phosphor-icons/react"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-svh p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/login" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <RowsIcon className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
    </div>
  )
}
