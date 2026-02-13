"use client";

import type { AxiosError } from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import axiosClient from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/endpoints";

export default function useCsrf() {
  useEffect(() => {
    const getCsrf = async () => {
      try {
        await axiosClient({
          url: API_ENDPOINTS.CSRF,
          method: "GET",
        });
      } catch (error) {
        const axiosError = error as AxiosError;

        if (!axiosError.response) {
          toast.error("Sin conexión", {
            description:
              "No pudimos conectar con el servidor. Espera unos minutos y reintenta nuevamente.",
          });
        } else {
          toast.error("Error de seguridad", {
            description:
              "Hubo un problema al preparar la sesión segura. Reintenta.",
          });
        }

        console.error("CSRF Fetch Error:", axiosError);
      }
    };

    getCsrf();
  }, []);
  return null;
}
