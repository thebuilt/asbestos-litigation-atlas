import { next } from "@vercel/functions";

const USERNAME = "admin";
const PASSWORD = "Pass9876@";

export default function middleware(request) {
  const authorization = request.headers.get("authorization");

  if (authorization) {
    const [scheme, encoded] = authorization.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded =
        typeof atob === "function"
          ? atob(encoded)
          : Buffer.from(encoded, "base64").toString("utf8");
      const separatorIndex = decoded.indexOf(":");
      const username = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : decoded;
      const password = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";

      if (username === USERNAME && password === PASSWORD) {
        return next();
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
  matcher: ["/((?!favicon.ico).*)"]
};
