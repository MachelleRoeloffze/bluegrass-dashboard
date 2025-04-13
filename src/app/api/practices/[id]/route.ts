import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  const { data, error } = await supabase
    .from("practices")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("logs").insert([
    {
      timestamp: new Date().toISOString(),
      user: "Machelle Roeloffze",
      action: "Edited Practice",
      target: data.name,
      status: "Success",
    },
  ]);

  return NextResponse.json(data);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const { data, error } = await supabase
    .from("practices")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  await supabase.from("logs").insert([
    {
      timestamp: new Date().toISOString(),
      user: "Machelle Roeloffze",
      action: "Deleted Practice",
      target: data.name,
      status: "Warning",
    },
  ]);

  return NextResponse.json({ success: true });
}
