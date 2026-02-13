"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/endpoints";

export async function handleServerLogout() {
  const cookieStore = await cookies();

  const csrfToken = cookieStore.get("csrftoken")?.value;
  const sessionid = cookieStore.get("sessionid")?.value;

  if (!csrfToken || !sessionid)
    throw new Error(
      "CSRF token not found. Please try logging out and logging in again.",
    );

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + API_ENDPOINTS.LOGOUT,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Cookie: `sessionid=${sessionid}; csrftoken=${csrfToken}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  cookieStore.delete("sessionid");

  redirect("/");
}
