import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAdapter } from "@/db/index";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const adapter = getAdapter();
  const user = await adapter.getUserByEmail(email.toLowerCase().trim());
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  session.user = { id: user.id, email: user.email };
  await session.save();

  return NextResponse.json({ id: user.id, email: user.email });
}
