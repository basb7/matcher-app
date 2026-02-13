"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";

export async function handleServerRegister(data: any) {
  // TODO: Crear validación datos con Zod

  const cookieStore = await cookies();
  const csrfToken = cookieStore.get("csrftoken")?.value;

  if (!csrfToken)
    throw new Error("CSRF token not found. Please try reload page again.");

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + API_ENDPOINTS.REGISTER,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        Cookie: `csrftoken=${csrfToken}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    return {
      success: false,
      status: res.status,
      statusText: res.statusText,
      message:
        res.status === 401
          ? "Credenciales invalidas"
          : errorData.message ||
            errorData.detail ||
            errorData.error ||
            "Error desconocido",
      errors:
        res.status === 400 && typeof errorData === "object"
          ? errorData
          : undefined,
    };
  }

  return { success: true, message: "Usuario creado exitosamente" };
}
