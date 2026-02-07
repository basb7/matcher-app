import AppBarDasboard from "@/components/dashboard/AppBarDashboard";
import { cookies } from 'next/headers';
import {API_ENDPOINTS} from "@/lib/endpoints";
import UserInitializer from "@/components/auth/userInitializer";

async function getUserData() {
  const cookieStore = await cookies();
  const sessionid = cookieStore.get('sessionid')?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.USER}`, {
    headers: {
      'Cookie': `sessionid=${sessionid}`,
    },
    // Next.js cacheará esto por la duración de la sesión
    next: { tags: ['user-profile'] }
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function LayoutDashboard({ children }: {children: React.ReactNode}) {
  const user = await getUserData();

  return (
    <>
      <AppBarDasboard />
      <UserInitializer user={user} />
      {children}
    </>
  );
}