import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function safePath(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    return "/dashboard";
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const destination = safePath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(destination, origin));
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=confirmation", origin)
  );
}
