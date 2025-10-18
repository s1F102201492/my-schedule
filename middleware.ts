import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    console.log("🔴 Middleware実行:", request.nextUrl.pathname);
    
    // update user's auth session
    const result = await updateSession(request);
    
    console.log("🔴 Middleware結果:", result);
    return result;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|manifest|sw\\.|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
