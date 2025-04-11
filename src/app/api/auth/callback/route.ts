import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient, { SigningKey } from "jwks-rsa";

export async function GET(req: Request) {
  try {
    console.log("➡️ Callback hit");
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) throw new Error("Missing authorization code");

    const tokenRes = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          code,
          redirect_uri: process.env.AUTH0_REDIRECT_URI,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    console.log("🎫 Token response:", tokenData);

    if (!tokenRes.ok || !tokenData.id_token) {
      console.error("❌ Token exchange failed");
      return new NextResponse(
        JSON.stringify({ message: "Callback complete" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const decoded = await verifyIdToken(tokenData.id_token);
    console.log("✅ Decoded token:", decoded);
    if (!decoded) throw new Error("Invalid ID token");

    (await cookies()).set("user-session", JSON.stringify(decoded), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    console.log("🍪 Cookie set!");
    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error("🔥 CALLBACK ERROR:", error);
    return NextResponse.redirect(new URL("/login?error=server_error", req.url));
  }
}

async function verifyIdToken(
  token: string
): Promise<Record<string, unknown> | null> {
  const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  });

  function getKey(header: JwtHeader, cb: SigningKeyCallback): void {
    if (!header.kid) {
      console.error("Missing 'kid' in JWT header");
      return cb(new Error("Missing 'kid' in JWT header"), undefined);
    }

    client.getSigningKey(header.kid, (err, key) => {
      if (err || !key) {
        console.error("Error retrieving signing key:", err);
        return cb(err || new Error("Signing key not found"), undefined);
      }

      const signingKey = (key as SigningKey).getPublicKey();
      cb(null, signingKey);
    });
  }

  return new Promise((resolve) => {
    jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        console.error("JWT verify error:", err);
        return resolve(null);
      }
      resolve(decoded as Record<string, unknown>);
    });
  });
}
