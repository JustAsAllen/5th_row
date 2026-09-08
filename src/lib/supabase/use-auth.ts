"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export function useAuth() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return { success: false, error };
    }
    toast.success("Account created! Check your email to verify.");
    return { success: true, data };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return { success: false, error };
    }
    toast.success("Welcome back!");
    return { success: true, data };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
  };

  return { signUp, signIn, signOut, loading };
}
