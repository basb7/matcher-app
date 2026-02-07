'use client'

import {useUserStore} from "@/store/useUserStore";
import {useShallow} from "zustand/react/shallow";

export default function Dashboard() {
  const {user} = useUserStore(useShallow(state => state))
  return (
    <div>Dashboard de {user?.username}</div>
  )
}