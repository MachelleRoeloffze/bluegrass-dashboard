import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

function extractId(req: NextRequest) {
  return req.nextUrl.pathname.split("/").pop(); // /api/practices/[id]
}

export async function PATCH(req: NextRequest) {
  const id = extractId(req);
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

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

export async function DELETE(req: NextRequest) {
  const id = extractId(req);
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const userEmail = "machelleroeloffze@gmail.com";

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
