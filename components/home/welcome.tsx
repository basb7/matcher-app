import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export function Welcome() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <Stack direction={'column'} gap={1} paddingTop={25}>
        <Typography variant="h1" textAlign={'center'} sx={{ fontWeight: 500 }}>
          Predice, compite
        </Typography>
        <Typography
          variant={'h1'}
          textAlign={'center'}
          color={'primary'}
          sx={{ fontWeight: 500 }}
        >
          Gana
        </Typography>
      </Stack>
      <Typography variant={'h6'}>
        Elige tus ganadores de cada partido y acumula puntos para llevarte el
        premio final.
      </Typography>
    </Box>
  );
}
