import { NextResponse } from "next/server";

function middleware(request) {
  const token = request.cookies.get("accessToken"); // Get the token from cookies
  const { pathname } = request.nextUrl;

  // If the user is already logged in and tries to access /admin/login, redirect them to /admin/dashboard
  if (pathname === "/admin/login" && token) {
    console.log("User already authenticated, redirecting to /admin/dashboard");
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Protect /admin/dashboard routes - redirect to /admin/login if no token
  if (pathname.startsWith("/admin/dashboard") && !token) {
    console.log("Unauthorized access, redirecting to /admin/login");
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next(); // Allow access to all other routes
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/admin/login"], // Apply middleware to admin routes
};

export default middleware;
