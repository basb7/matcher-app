import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
} from '@mui/material';
import {
  PersonAdd,
  GpsFixed,
  EmojiEvents,
  AccountBalanceWallet,
} from '@mui/icons-material';

const steps = [
  {
    icon: <PersonAdd sx={{ fontSize: 32 }} />,
    title: 'Regístrate',
    description:
      'Crea tu cuenta gratis y únete a la competencia de la temporada.',
  },
  {
    icon: <GpsFixed sx={{ fontSize: 32 }} />,
    title: 'Predice',
    description: 'Antes de cada jornada, elige qué equipo ganará cada partido.',
  },
  {
    icon: <EmojiEvents sx={{ fontSize: 32 }} />,
    title: 'Acumula Puntos',
    description:
      'Gana 3 puntos por acierto exacto, 1 punto por resultado parcial.',
  },
  {
    icon: <AccountBalanceWallet sx={{ fontSize: 32 }} />,
    title: 'Gana el Premio',
    description:
      'Al final de la temporada, los mejores se llevan el premio acumulado.',
  },
];

export function HowItWorks() {
  return (
    <Box component={'section'} id="¿Cómo funciona?" sx={{ paddingY: 10 }}>
      <Stack
        direction={'column'}
        gap={2}
        alignItems={'center'}
        paddingBottom={8}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          ¿Como funciona?
        </Typography>
        <Typography>
          Cuatro simples pasos para competir por el premio de la temporada
        </Typography>
      </Stack>

      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Grid container spacing={3}>
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
              <Box sx={{ position: 'relative', height: '100%' }}>
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', lg: 'block' },
                      position: 'absolute',
                      top: '48px',
                      left: '100%',
                      width: '100%',
                      height: '1px',
                      background:
                        'linear-gradient(to right, rgba(255, 193, 7, 0.5), transparent)',
                      zIndex: 0,
                    }}
                  />
                )}

                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    zIndex: 10,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.2s ease-in-out',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  {/* Step number */}
                  <Avatar
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: -12,
                      width: 32,
                      height: 32,
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                    }}
                  >
                    {index + 1}
                  </Avatar>

                  <CardContent sx={{ p: 3 }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        bgcolor: 'rgba(255, 193, 7, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFD700',
                        mb: 2,
                      }}
                    >
                      {step.icon}
                    </Box>

                    {/* Content */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        color: 'text.primary',
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.5,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
