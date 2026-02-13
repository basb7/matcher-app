"use server";

import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionid")?.value;

  return Boolean(sessionId);
}
