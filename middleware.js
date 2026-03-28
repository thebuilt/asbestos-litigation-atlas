const USERNAME = "admin";
const PASSWORD = "Pass9876@";

export function middleware(request) {
  const authorization = request.headers.get("authorization");

  if (authorization) {
    const [scheme, encoded] = authorization.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [username, password] = decoded.split(":");

      if (username === USERNAME && password === PASSWORD) {
        return new Response(null, { status: 200, headers: request.headers });
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Asbestos Litigation Atlas"'
    }
  });
}

export const config = {
  matcher: ["/", "/api/:path*", "/((?!_next|favicon.ico).*)"]
};
