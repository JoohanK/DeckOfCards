import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import { SettingsProvider } from "../context/SettingsContext"; // Importera SettingsProvider

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("light");
    }, 0);
  }, []);

  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SettingsProvider>
  );
}
