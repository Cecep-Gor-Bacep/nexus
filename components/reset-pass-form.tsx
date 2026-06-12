"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Karena sistem pendaftaran menggunakan dummyEmail, kita gunakan format yang sama
    const dummyEmail = `${username}@nexus.local`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(dummyEmail, {
      // URL tujuan setelah user mengklik link reset dari email
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Instruksi reset kata sandi telah dikirim!" });
    }
    
    setLoading(false);
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleReset}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Masukkan Username Anda untuk menerima tautan reset kata sandi
          </p>
        </div>

        {message && (
          <div className={cn(
            "text-sm font-medium p-2 rounded text-center",
            message.type === "error" ? "text-red-500 bg-red-500/10" : "text-green-500 bg-green-500/10"
          )}>
            {message.text}
          </div>
        )}
        
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="Masukkan Username"
            required
            className="bg-background"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Memproses..." : "Kirim Tautan Reset"}
          </Button>
        </Field>
        
        <Field>
          <FieldDescription className="text-center">
            Ingat kata sandi Anda?{" "}
            <a href="/login" className="underline underline-offset-4 hover:text-primary">
              Kembali ke Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}