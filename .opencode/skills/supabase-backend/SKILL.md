---
name: supabase-backend
description: Use when the user needs a backend, database, authentication, realtime features, file storage, or server-side functionality for their website. Trigger keywords: database, backend, supabase, auth, login, signup, realtime, storage, API, tables, rows, postgres, sign in, user accounts, forms data.
---

# Supabase Backend Development

Use this whenever building database/auth/backend features. This project uses Supabase.

## Core Setup

```ts
// src/lib/supabase/client.ts - browser
import { createBrowserClient } from "@supabase/ssr";
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// src/lib/supabase/server.ts - server components / API routes
import { createClient } from "@supabase/supabase-js";
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

Env vars needed (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key  # server only, never exposed
```

## CRUD Cheat Sheet

> **CRITICAL — RLS reality check (verified):** With the **anon key**, `.insert().select()` (and `.insert().select().single()`) FAILS with **401, code `42501` "new row violates row-level security policy"** — even when a policy allows the insert. That's because `return=representation` (what `.select()` triggers via the `Prefer` header) re-reads the row, which requires a **SELECT** policy the anon role doesn't have. The plain `.insert()` (no `.select()`) succeeds (201). So: anonymous insert → skip `.select()`; returning data from a write is only safe for **authenticated** roles or the **service role** (server-side).

```ts
// CREATE — anon/public form submission (RLS-correct: NO .select())
const { error } = await supabase.from("contacts").insert({ name, email });

// CREATE — authenticated or server-side (service role): can return the row
const { data, error } = await supabase.from("profiles").insert({ name }).select().single();

// READ (list)
const { data } = await supabase.from("users").select("*").order("created_at", { ascending: false });

// READ (filter)
const { data } = await supabase.from("users").select("*").eq("status", "active").limit(10);

// READ (single by id)
const { data } = await supabase.from("users").select("*").eq("id", id).single();

// UPDATE — authenticated / service role: .select() OK; anon can't update
const { data } = await supabase.from("users").update({ name: "New" }).eq("id", id).select();

// DELETE — authenticated (owner) / service role
await supabase.from("users").delete().eq("id", id);

// COUNT / aggregates
const { count } = await supabase.from("users").select("*", { count: "exact", head: true });
```

## Authentication (Email/Password)

```ts
// Sign up
const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({ email, password });

// Sign out
await supabase.auth.signOut();

// Get current user
const { data: { user } } = await supabase.auth.getUser();

// Session listener for realtime auth state
supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") { /* update UI */ }
  if (event === "SIGNED_OUT") { /* reset UI */ }
});
```

## Realtime (Live Updates)

```ts
// Stream table changes
const channel = supabase
  .channel("table-changes")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
    console.log("New message:", payload.new);
  })
  .subscribe();

// Cleanup
return () => { supabase.removeChannel(channel); };
```

Enable Realtime: Dashboard → Database → Replication → enable on the table.

## Storage (File Uploads)

```ts
// Upload to bucket "avatars"
const { data, error } = await supabase.storage.from("avatars").upload(`user-${id}.png`, file);

// Public URL
const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(filePath);

// List files
const { data } = await supabase.storage.from("avatars").list();
```

## Row Level Security (RLS) - IMPORTANT

Always enable RLS on tables. **Anon INSERT + auth-only SELECT is the most common safe pattern** for public forms (e.g. a contact form). Nobody can read the rows; the insert still works:

```sql
-- Anonymous can always INSERT (but never SELECT)
CREATE POLICY "anon_can_insert" ON contacts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Only signed-in users can SELECT
CREATE POLICY "auth_can_read" ON contacts FOR SELECT
  TO authenticated USING (true);
```

More common policies:
```sql
-- Users can read all public rows
CREATE POLICY "Public read" ON profiles FOR SELECT USING (true);

-- Users can only edit their own row
CREATE POLICY "Update own" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Users can insert with their own user_id
CREATE POLICY "Insert own" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
```

Verify what's actually live (Management API / `pg_policies` queries confirm the final state — don't trust assumptions about policies after editing them).

## API Routes Security

```ts
// src/app/api/items/route.ts
export async function POST(request: Request) {
  const { user } = await supabaseServer.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  // ... proceed
}
```

## Common SQL Snippets

```sql
-- Create table with auth reference
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Unique constraint
alter table users add constraint users_email_key unique (email);
```

## Rules
1. NEVER expose service role key to the browser — use anon key
2. Always handle errors: `if (error) throw error` or toast it
3. `.select()` after insert/update ONLY for authenticated or server-side (service role). Anonymous inserts must NOT chain `.select()` — it returns 401 code 42501 under RLS (see CRUD sheet above)
4. Enforce RLS on all tables in production
5. Use `.from("table")` — never raw SQL in the browser
6. If a 401/42501 appears during testing a "simple" anon insert, it's the missing SELECT policy, not a broken insert — check `pg_policies` before changing code
7. Test with plain anon key in Node fetch (not a curl/PowerShell quirk) — `Invoke-WebRequest`/`Invoke-RestMethod` without `-UseBasicParsing` can falsely report 401