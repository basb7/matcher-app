"use client";

import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/useUserStore";

export default function ProfilePage() {
  const { user } = useUserStore(useShallow((state) => state));
  return (
    <>
      <div>Perfil de {user?.username}</div>
      <Link href={"/dashboard"}>Regresar al dashboard</Link>
    </>
  );
}
