import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function requireStaff(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", ctx.userId);
  if (error) throw new Error("Unable to verify role");
  const roles = (data ?? []).map((r: { role: string }) => r.role);
  const isOwner = roles.includes("owner");
  const isManager = roles.includes("manager");
  if (!isOwner && !isManager) throw new Error("Forbidden");
  return { isOwner, isManager };
}

// ---------- Me ----------
export const getMe = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const roles = (data ?? []).map((r) => r.role as string);
    return {
      userId: context.userId,
      email: (context.claims as any)?.email ?? null,
      isOwner: roles.includes("owner"),
      isManager: roles.includes("manager"),
      isStaff: roles.includes("owner") || roles.includes("manager"),
    };
  });

// ---------- Bookings ----------
export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context);
    const { data, error } = await context.supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const updateBookingSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "confirmed", "declined", "archived"]),
});
export const updateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => updateBookingSchema.parse(d))
  .handler(async ({ context, data }) => {
    await requireStaff(context);
    const { error } = await context.supabase
      .from("booking_requests")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const deleteBookingSchema = z.object({ id: z.string().uuid() });
export const deleteBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => deleteBookingSchema.parse(d))
  .handler(async ({ context, data }) => {
    await requireStaff(context);
    const { error } = await context.supabase
      .from("booking_requests")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- Managers (owner only) ----------
async function requireOwner(ctx: { supabase: any; userId: string }) {
  const { isOwner } = await requireStaff(ctx);
  if (!isOwner) throw new Error("Only the owner can manage staff");
}

export const listManagers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireStaff(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roleRows, error: rolesErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id, role, created_at")
      .order("created_at", { ascending: false });
    if (rolesErr) throw new Error(rolesErr.message);

    const users: Array<{ id: string; email: string; role: string; created_at: string }> = [];
    for (const row of roleRows ?? []) {
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(row.user_id);
      users.push({
        id: row.user_id,
        email: userData.user?.email ?? "(unknown)",
        role: row.role,
        created_at: row.created_at,
      });
    }
    return users;
  });

const inviteSchema = z.object({
  email: z.string().trim().email().max(320),
});

const initialOwnerSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

const OWNER_EMAIL = "bouriguemustapha0@gmail.com";

export const createInitialOwner = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => initialOwnerSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.email.toLowerCase() !== OWNER_EMAIL) {
      throw new Error("Use the configured owner email for first-time setup");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existingOwner, error: ownerErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "owner")
      .limit(1);
    if (ownerErr) throw new Error(ownerErr.message);
    if ((existingOwner ?? []).length > 0) {
      throw new Error("The owner account is already set up. Please sign in or reset your password.");
    }

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error) throw new Error(error.message);
    if (!created.user) throw new Error("Could not create owner account");

    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: created.user.id, role: "owner" });
    if (roleErr) throw new Error(roleErr.message);

    return { ok: true };
  });

export const inviteManager = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => inviteSchema.parse(d))
  .handler(async ({ context, data }) => {
    await requireOwner(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const siteUrl =
      process.env.SITE_URL ||
      process.env.VITE_SITE_URL ||
      "";
    const redirectTo = siteUrl
      ? `${siteUrl.replace(/\/$/, "")}/reset-password`
      : undefined;

    const { data: invited, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      data.email,
      redirectTo ? { redirectTo } : undefined
    );
    if (error) throw new Error(error.message);
    if (!invited.user) throw new Error("Invite failed");

    const { error: roleErr } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: invited.user.id, role: "manager" });
    // ignore duplicate-role conflict
    if (roleErr && !/duplicate|unique/i.test(roleErr.message)) {
      throw new Error(roleErr.message);
    }
    return { ok: true, email: data.email };
  });

const removeSchema = z.object({ userId: z.string().uuid() });
export const removeManager = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => removeSchema.parse(d))
  .handler(async ({ context, data }) => {
    await requireOwner(context);
    if (data.userId === context.userId) {
      throw new Error("You cannot remove yourself");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Do NOT let anyone remove another owner
    const { data: target } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", data.userId);
    if ((target ?? []).some((r) => r.role === "owner")) {
      throw new Error("Cannot remove an owner");
    }
    // Remove role rows, then delete the auth user entirely (revokes access)
    await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    const { error: delErr } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (delErr) throw new Error(delErr.message);
    return { ok: true };
  });
