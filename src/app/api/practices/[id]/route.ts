// import { supabase } from "@/lib/supabaseClient";
// import { NextRequest, NextResponse } from "next/server";

// // PATCH request
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   const body = await req.json();
//   console.log("Received PATCH request for ID:", id);
//   console.log("Request Body:", body);

//   const { data, error } = await supabase
//     .from("practices")
//     .update(body)
//     .eq("id", id)
//     .select()
//     .maybeSingle();

//   if (error) {
//     console.error("Error in PATCH:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   console.log("Updated data:", data);

//   // Log activity after successful update
//   const logInsert = await supabase.from("logs").insert([
//     {
//       timestamp: new Date().toISOString(),
//       user_email: "machelleroeloffze@gmail.com", // Example user email
//       action: "Edited Practice",
//       target: data?.name || "Unknown",
//       status: "Success",
//     },
//   ]);

//   console.log("Log inserted for editing practice:", logInsert);

//   return NextResponse.json(data);
// }

// // DELETE request
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id;
//   console.log("Received DELETE request for ID:", id);

//   const { data, error } = await supabase
//     .from("practices")
//     .delete()
//     .eq("id", id)
//     .select()
//     .maybeSingle();

//   if (error) {
//     console.error("Error in DELETE:", error.message);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   console.log("Deleted data:", data);

//   // Log activity after successful delete
//   const logInsert = await supabase.from("logs").insert([
//     {
//       timestamp: new Date().toISOString(),
//       user_email: "machelleroeloffze@gmail.com", // Example user email
//       action: "Deleted Practice",
//       target: data?.name || "Unknown",
//       status: "Warning",
//     },
//   ]);

//   console.log("Log inserted for deleting practice:", logInsert);

//   return NextResponse.json({ success: true });
// }
