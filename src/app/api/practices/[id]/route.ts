import { supabase } from "@/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the context parameter
interface Context {
  params: {
    id: string; // Define the `id` parameter as a string type
  };
}

// PATCH request
export async function PATCH(req: NextRequest, context: Context) {
  const id = context.params.id; // Now, `id` is explicitly typed as a string
  const body = await req.json();

  const { data, error } = await supabase
    .from("practices")
    .update(body)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("logs").insert([
    {
      timestamp: new Date().toISOString(),
      user_email: "machelleroeloffze@gmail.com", // Replace with actual user email
      action: "Edited Practice",
      target: data?.name || "Unknown",
      status: "Success",
    },
  ]);

  return NextResponse.json(data);
}

// DELETE request
export async function DELETE(req: NextRequest, context: Context) {
  const id = context.params.id; // Now, `id` is explicitly typed as a string

  const { data, error } = await supabase
    .from("practices")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("logs").insert([
    {
      timestamp: new Date().toISOString(),
      user_email: "machelleroeloffze@gmail.com", // Replace with actual user email
      action: "Deleted Practice",
      target: data?.name || "Unknown",
      status: "Warning",
    },
  ]);

  return NextResponse.json({ success: true });
}
