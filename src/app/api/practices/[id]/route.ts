import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// PATCH request — update practice + actions + log
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const body = await req.json();

  const userEmail = "machelleroeloffze@gmail.com";

  const updateWithActions = {
    ...body,
    actions: {
      ...(body.actions || {}),
      lastEditedBy: userEmail,
      lastEditedAt: new Date().toISOString(),
    },
  };

  const { data, error } = await supabase
    .from("practices")
    .update(updateWithActions)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error in PATCH:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("logs").insert([
    {
      timestamp: new Date().toISOString(),
      user_email: userEmail,
      action: "Edited Practice",
      target: data?.name || "Unknown",
      status: "Success",
    },
  ]);

  return NextResponse.json(data);
}

// DELETE request — update actions + log + hard delete
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const userEmail = "machelleroeloffze@gmail.com";

  console.log("🗑️ Deleting practice with ID:", id);

  await supabase
    .from("practices")
    .update({
      actions: {
        lastDeletedBy: userEmail,
        lastDeletedAt: new Date().toISOString(),
      },
    })
    .eq("id", id);

  const { data, error } = await supabase
    .from("practices")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error in DELETE:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("logs").insert([
    {
      timestamp: new Date().toISOString(),
      user_email: userEmail,
      action: "Deleted Practice",
      target: data?.name || "Unknown",
      status: "Warning",
    },
  ]);

  return NextResponse.json({ success: true });
}
