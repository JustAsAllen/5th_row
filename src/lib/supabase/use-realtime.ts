"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useRef, useState } from "react";
import type {
  RealtimeChannel,
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";

type RealtimeEvent = "*" | "INSERT" | "UPDATE" | "DELETE";

interface UseRealtimeOptions {
  table: string;
  event?: RealtimeEvent;
  schema?: string;
  filter?: string;
}

type RowId = string | number;

function getRowId(row: Record<string, unknown>): RowId | undefined {
  const id = row.id;
  return typeof id === "string" || typeof id === "number" ? id : undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

export function useRealtime<T = Record<string, unknown>>({
  table,
  event = "*",
  schema = "public",
  filter,
}: UseRealtimeOptions) {
  const [rows, setRows] = useState<T[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const filterOpts: RealtimePostgresChangesFilter<RealtimeEvent> = {
      event,
      schema,
      table,
      ...(filter ? { filter } : {}),
    };

    channelRef.current = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        filterOpts,
        (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
          if (event === "INSERT") {
            setRows((prev) => [...prev, payload.new as unknown as T]);
          } else if (event === "UPDATE") {
            setRows((prev) => {
              const newRow = asRecord(payload.new);
              const newId = getRowId(newRow);
              return prev.map((row) => {
                const rowId = getRowId(asRecord(row));
                return rowId !== undefined && newId !== undefined && rowId === newId
                  ? (payload.new as unknown as T)
                  : row;
              });
            });
          } else if (event === "DELETE") {
            setRows((prev) => {
              const oldRow = asRecord(payload.old);
              const oldId = getRowId(oldRow);
              return prev.filter((row) => {
                const rowId = getRowId(asRecord(row));
                return !(rowId !== undefined && oldId !== undefined && rowId === oldId);
              });
            });
          } else {
            supabase.from(table).select("*").then(({ data }: { data: unknown }) => {
              setRows((data as T[]) ?? []);
            });
          }
        }
      )
      .subscribe();

    supabase.from(table).select("*").then(({ data }: { data: unknown }) => {
      setRows((data as T[]) ?? []);
    });

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [table, event, schema, filter]);

  return rows;
}
