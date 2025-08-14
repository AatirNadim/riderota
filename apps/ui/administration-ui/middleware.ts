import { NextResponse, type NextRequest } from "next/server";
import { hostname } from "zod/v4/mini";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const domain = (request.headers.get("host") || "").replace(/:\d+$/, ""); // Remove port if present

  const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost";

  if (!domain) {
    return new Response("Domain not found.", { status: 400 });
  }

  let subdomain: string | null = null;
  if (domain !== ROOT_DOMAIN && domain.endsWith("." + ROOT_DOMAIN)) {
    subdomain = domain.replace("." + ROOT_DOMAIN, "");
  }

  if (!subdomain) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: `Invalid hostname. Please use a subdomain like 'app.${ROOT_DOMAIN}' or '<your-tenant>.${ROOT_DOMAIN}'.`,
      }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  url.pathname = `/${subdomain}${url.pathname}`;

  // console.log("Rewriting to:", url);

  return NextResponse.rewrite(url);
}

export const config = {
  // This matcher ensures the middleware runs on all requests
  // except for Next.js internal assets, API routes, and static files.
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
