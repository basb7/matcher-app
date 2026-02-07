'use client'

import { useRef } from 'react';
import { useUserStore } from '@/store/useUserStore';
import {useShallow} from "zustand/react/shallow";

export default function UserInitializer({ user }: { user: any }) {
  const {setUser} = useUserStore(useShallow(state => state))
  const initialized = useRef(false);

  if (!initialized.current) {
    setUser(user);
    initialized.current = true;
  }

  return null;
}