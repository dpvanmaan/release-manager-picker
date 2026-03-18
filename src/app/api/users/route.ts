import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getAdapter } from "@/db/index";
import { sessionOptions, type SessionData } from "@/lib/session";

export async function GET() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const adapter = getAdapter();
  const users = await adapter.listUsers();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
  if (!session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const adapter = getAdapter();
  const existing = await adapter.getUserByEmail(email.toLowerCase().trim());
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await adapter.createUser(email.toLowerCase().trim(), passwordHash);

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
