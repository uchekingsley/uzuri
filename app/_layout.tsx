import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    'Grotley': require('@/assets/fonts/Grotley-Regular.otf'),
  });

   useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  return <Stack screenOptions={{
    headerShown : false
  }} />;
}
