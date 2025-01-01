import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/store";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import { fontConfig } from "./src/theme/fonts";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { colorScheme } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#000" : "#fff"}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontConfig);

  React.useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <PaperProvider>
          <AppContent />
        </PaperProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
