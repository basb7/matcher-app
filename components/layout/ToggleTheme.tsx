"use client";

import Box from "@mui/material/Box";
import { useColorScheme, useTheme } from "@mui/material/styles";
import { ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";

export default function ToggleTheme() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleChangeTheme = (
    event: React.MouseEvent<HTMLElement>,
    newTheme: string | null,
  ) => {
    if (newTheme !== null) {
      setMode(newTheme as "light" | "dark" | "system");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <ToggleButtonGroup
        size={isSmallScreen ? "large" : "small"}
        value={mode}
        onChange={handleChangeTheme}
        exclusive
        aria-label="theme mode"
      >
        <ToggleButton value="light" aria-label="theme light">
          <LightModeIcon sx={{ fontSize: { md: "medium" } }} />
        </ToggleButton>
        <ToggleButton value="system" aria-label="theme system">
          <SettingsBrightnessIcon sx={{ fontSize: { md: "medium" } }} />
        </ToggleButton>
        <ToggleButton value="dark" aria-label="theme dark">
          <DarkModeIcon sx={{ fontSize: { md: "medium" } }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
