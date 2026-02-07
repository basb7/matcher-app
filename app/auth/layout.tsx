import { Box } from '@mui/material';

export default function AuthLayout({children}: { children: React.ReactNode }) {
  return (
    <Box
      component={'section'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
}
