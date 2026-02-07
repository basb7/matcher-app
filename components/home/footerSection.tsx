'use client'

import { Box, Typography } from '@mui/material';

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {currentYear} Matcher. All rights reserved.
      </Typography>
    </Box>
  );
}
