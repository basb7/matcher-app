"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Card, CardContent, Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleServerRegister } from "@/actions/auth/register";
import useCsrf from "@/hooks/useCsrf";

interface IFormInput {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function FormRegister() {
  useCsrf();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { success, message, errors } = await handleServerRegister(data);

    if (!success) {
      if (!errors) return toast.error(message);

      Object.keys(errors).forEach((key) => {
        const message = errors[key][0];

        setError(key as keyof IFormInput, {
          type: "server",
          message: message,
        });
      });
      return;
    }

    toast.success(message, {
      description: "Inicie sessión para continuar",
    });

    router.push("/auth/login");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 400, width: 600, p: 1 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
          >
            Registro
          </Typography>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            autoComplete={"off"}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Controller
              name={"first_name"}
              control={control}
              rules={{
                required: "Campo requerido",
                minLength: {
                  message: "Debe ser minimo de 3 carácteres",
                  value: 3,
                },
                maxLength: {
                  message: "Debe ser máximo de 150 carácteres",
                  value: 150,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  fullWidth
                  label="Nombres"
                  type="text"
                  required
                  variant="outlined"
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name={"last_name"}
              control={control}
              rules={{
                required: "Campo requerido",
                minLength: {
                  message: "Debe ser minimo de 3 carácteres",
                  value: 3,
                },
                maxLength: {
                  message: "Debe ser máximo de 150 carácteres",
                  value: 150,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  fullWidth
                  label="Apellidos"
                  type="text"
                  required
                  variant="outlined"
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name={"username"}
              control={control}
              rules={{
                required: false,
                minLength: {
                  message: "Debe ser minimo de 3 carácteres",
                  value: 3,
                },
                maxLength: {
                  message: "Debe ser máximo de 150 carácteres",
                  value: 150,
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  fullWidth
                  label="Username"
                  type="text"
                  required={false}
                  variant="outlined"
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name={"email"}
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
                minLength: {
                  message: "Debe ser minimo 8 carácteres",
                  value: 8,
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

            <Controller
              name={"confirmPassword"}
              control={control}
              rules={{
                required: "Campo requerido",
                validate: {
                  checkValidateMatchPasswords: () => {
                    const [password, confirmPassword] = watch([
                      "password",
                      "confirmPassword",
                    ]);

                    const isMatchPass = password === confirmPassword;
                    return (
                      isMatchPass ||
                      "Las contraseñas no coinciden, intente nuevamente."
                    );
                  },
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={Boolean(error)}
                  fullWidth
                  label="Confirmar Contraseña"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  variant="outlined"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
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
              Registrarse
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction={"column"} gap={2} alignItems={"center"}>
            <Link href="/auth/login">Ya tengo una cuenta</Link>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
