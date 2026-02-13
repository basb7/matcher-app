"use server";

import { cookies } from "next/headers";
import { API_ENDPOINTS } from "@/lib/endpoints";

export async function handleServerLogin(data: any) {
  const { email, password } = data;
  // TODO: Crear validación datos con Zod
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + API_ENDPOINTS.LOGIN,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
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
    };
  }

  function parseCookieAttributes(cookieStr: string) {
    const parts = cookieStr.split(";");
    const attributes: any = {};

    parts.forEach((part, index) => {
      const [key, value] = part.split("=");
      const trimmedKey = key.trim().toLowerCase();

      // La primera parte es el nombre=valor de la cookie, el resto son atributos
      if (index === 0) return;

      if (trimmedKey === "expires") {
        attributes.expires = new Date(value.trim());
      } else if (trimmedKey === "max-age") {
        attributes.maxAge = parseInt(value.trim(), 10);
      } else if (trimmedKey === "httponly") {
        attributes.httpOnly = true;
      } else if (trimmedKey === "secure") {
        attributes.secure = true;
      } else if (trimmedKey === "path") {
        attributes.path = value.trim();
      } else if (trimmedKey === "samesite") {
        attributes.sameSite = value.trim().toLowerCase();
      }
    });

    return attributes;
  }

  const cookieStore = await cookies();
  const rawCookies = res.headers.get("set-cookie");

  if (rawCookies) {
    // El mismo Regex que no rompe las fechas
    const cookieArray = rawCookies.split(/,(?=[^;]*=)/);

    cookieArray.forEach((cookieStr) => {
      const [nameValue] = cookieStr.split(";");
      const [name, value] = nameValue.split("=");
      const cookieName = name.trim();

      // Extraemos todos los atributos (expires, max-age, etc.)
      const attrs = parseCookieAttributes(cookieStr);

      cookieStore.set(cookieName, value.trim(), {
        path: attrs.path || "/",
        // Usamos el expires original de Django si existe
        expires: attrs.expires,
        maxAge: attrs.maxAge,
        httpOnly: cookieName === "sessionid" || attrs.httpOnly,
        secure: process.env.NODE_ENV === "production" || attrs.secure,
        sameSite: attrs.sameSite || "lax",
      });
    });
  }

  return { success: true };
}
