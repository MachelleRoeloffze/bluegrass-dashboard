import { NextResponse } from "next/server";

export async function GET() {
  const loginUrl =
    `https://${process.env.AUTH0_DOMAIN}/authorize?` +
    new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      redirect_uri: process.env.AUTH0_REDIRECT_URI!,
      response_type: "code",
      scope: "openid profile email",
    });

  return NextResponse.redirect(loginUrl);
}
