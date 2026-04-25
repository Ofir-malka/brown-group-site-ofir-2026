import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");

  const username = "Gefen Brown";
  const password = "Brown0511!";

  if (!auth) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  const base64Credentials = auth.split(" ")[1];
  const credentials = atob(base64Credentials);
  const [user, pass] = credentials.split(":");

  if (user !== username || pass !== password) {
    return new Response("Access denied", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/crm"],
};