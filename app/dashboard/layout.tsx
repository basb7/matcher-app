import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import UserInitializer from "@/components/auth/userInitializer";
import AppBarDasboard from "@/components/dashboard/AppBarDashboard";
import { API_ENDPOINTS } from "@/lib/endpoints";

async function getUserData() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get("sessionid")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.USER}`,
    {
      headers: {
        Cookie: `sessionid=${sessionid}`,
      },
    },
  );

  if (!res.ok) {
    if (res.status === 401) return null; // Redirigir al login fuera de aquí

    const errorData = await res.json().catch(() => ({}));
    const message = errorData.detail || "Error en el servidor";

    // Lanzamos el error aquí mismo para que lo atrape el Error Boundary
    throw new Error(message);
  }

  return res.json();
}

export default async function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserData();

  if (!user) {
    toast.info("Su sesión ha expirado", {
      description: "Inicie sesión nuevamente para continuar.",
    });
    redirect("/auth/login");
  }

  return (
    <>
      <AppBarDasboard />
      <UserInitializer user={user} />
      {children}
    </>
  );
}
