"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

export function useStorage(bucket: string) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, path: string) => {
    setUploading(true);
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    setUploading(false);

    if (error) {
      toast.error(error.message);
      return { success: false, error };
    }

    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    toast.success("Uploaded!");
    return { success: true, url: urlData.publicUrl, path: data.path };
  };

  const getPublicUrl = (path: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const remove = async (path: string) => {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success("Deleted");
    return true;
  };

  return { upload, getPublicUrl, remove, uploading };
}
