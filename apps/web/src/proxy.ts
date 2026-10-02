import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next internals and any request for a file (contains a dot).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
