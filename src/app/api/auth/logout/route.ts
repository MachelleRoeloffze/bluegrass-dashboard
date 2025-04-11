import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  (await cookieStore).set("user-session", "", {
    path: "/",
    maxAge: -1,
  });

  const logoutUrl =
    `https://${process.env.AUTH0_DOMAIN}/v2/logout?` +
    new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      returnTo: process.env.AUTH0_LOGOUT_REDIRECT_URI!,
    });

  return NextResponse.redirect(logoutUrl);
}
