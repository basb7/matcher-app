import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { SportsSoccer, SportsBasketball } from '@mui/icons-material';

const sports = [
  {
    icon: <SportsSoccer sx={{ fontSize: 48 }} />,
    name: 'Fútbol',
    available: true,
  },
  {
    icon: <SportsBasketball sx={{ fontSize: 48 }} />,
    name: 'Baloncesto',
    available: false,
  },
];

export function CategorySections() {
  return (
    <Box component={'section'} sx={{ paddingY: 10 }} id="Competiciones">
      <Stack direction={'column'} gap={2} alignItems={'center'} sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Competiciones disponibles
        </Typography>
        <Typography color="text.secondary">
          Elige tu deporte favorito y comienza a competir
        </Typography>
      </Stack>

      <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
        <Grid container spacing={4} justifyContent="center">
          {sports.map((sport, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: sport.available
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(128, 128, 128, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: sport.available
                    ? '1px solid rgba(255, 193, 7, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: sport.available ? 'pointer' : 'default',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': sport.available
                    ? {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(255, 193, 7, 0.2)',
                      }
                    : {},
                }}
              >
                {!sport.available && (
                  <Chip
                    label="Próximamente"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'rgba(255, 193, 7, 0.2)',
                      color: '#FFD700',
                      fontSize: '0.75rem',
                      zIndex: 1,
                    }}
                  />
                )}

                <CardContent
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 3,
                      bgcolor: sport.available
                        ? 'rgba(255, 193, 7, 0.1)'
                        : 'rgba(128, 128, 128, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: sport.available ? '#FFD700' : '#888',
                      mb: 1,
                    }}
                  >
                    {sport.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: sport.available ? 'text.primary' : 'text.disabled',
                    }}
                  >
                    {sport.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
