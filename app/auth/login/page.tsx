'use client'

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useEffect, useState} from 'react';
import IconButton from '@mui/material/IconButton';
import { toast } from 'sonner';
import Link from 'next/link'
import {handleServerLogin} from "@/actions/login";
import axiosClient from "@/lib/axios";
import {API_ENDPOINTS} from "@/lib/endpoints";

interface IFormInput {
  email: string;
  password: string;
}

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState:{isSubmitting} } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data)
    try {
      const {success, message} = await handleServerLogin(data);
      if (!success) {
        toast.info(message)
      }
    } catch (error) {
      console.error("Error en la solicitud para iniciar sesión:", error);
      toast.error('Error en la solicitud para iniciar sesión')
    }
    // try {
    //   const response = await axios({
    //     baseURL: VITE_BASE_URL,
    //     method: 'POST',
    //     url: ENDPOINTS_API.LOGIN,
    //     data,
    //     withCredentials: true,
    //   });
    //
    //   if (response.status === 200) {
    //     navigate('/dashboard');
    //   }
    // } catch (error) {
    //   const errorAxios = error as AxiosError;
    //
    //   if ([401, 403].includes(errorAxios.response?.status ?? 0)) {
    //     toast.error('Error al iniciar sesión.', {
    //       description: 'Verifique sus credenciales y vuelva a intentarlo.',
    //     });
    //   } else {
    //     toast.error('Error desconocido.', { description: errorAxios.message });
    //   }
    // }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getCsrf = async () => {
      try {
        await axiosClient({
          url: API_ENDPOINTS.CSRF,
          method: 'GET',
        })
      } catch (error) {
        console.error(error)
      }
    }

    getCsrf()
  }, []);

  return (
    <Card sx={{ maxWidth: 400, width: '100%', p: 1 }}>
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
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Campo requerido',
              pattern: {
                message: 'Ingrese un email válido',
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
            name={'password'}
            control={control}
            rules={{
              required: 'Campo requerido',
              maxLength: {
                message: 'La longitud no debe superar los 100 carácteres',
                value: 100,
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={Boolean(error)}
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                required
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        aria-label={
                          showPassword
                            ? 'hide the password'
                            : 'display the password'
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

          <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
            Iniciar Sesión
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Stack direction={'column'} gap={2} alignItems={'center'}>
          <Link href={'#'}>Olvide mi contraseña</Link>
          <Link href="/auth/register">Crear una cuenta</Link>
          <Link href="/dashboard">Ir al dashboard</Link>
        </Stack>
      </CardContent>
    </Card>
  );
}
