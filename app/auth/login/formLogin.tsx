"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleServerLogin } from "@/actions/auth/login";
import useCsrf from "@/hooks/useCsrf";

interface IFormInput {
  email: string;
  password: string;
}

export default function FormLogin() {
  useCsrf();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { success, message } = await handleServerLogin(data);

    if (!success) {
      toast.info(message);
      return;
    }

    router.push("/dashboard");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card sx={{ maxWidth: 400, width: "100%", p: 1 }}>
      <CardContent>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          noValidate
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Campo requerido",
              pattern: {
                message: "Ingrese un email válido",
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={Boolean(error)}
                fullWidth
                label="Email"
                type="email"
                required
                variant="outlined"
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name={"password"}
            control={control}
            rules={{
              required: "Campo requerido",
              maxLength: {
                message: "La longitud no debe superar los 100 carácteres",
                value: 100,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={Boolean(error)}
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                required
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  },
                }}
                helperText={error?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
          >
            Iniciar Sesión
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack direction={"column"} gap={2} alignItems={"center"}>
          <Link href={"#"}>Olvide mi contraseña</Link>
          <Link href="/auth/register">Crear una cuenta</Link>
        </Stack>
      </CardContent>
    </Card>
  );
}
