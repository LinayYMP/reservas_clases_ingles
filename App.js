import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReservaProvider } from './src/context/ReservasContext';
import ClasesStack from './src/navigation/ClasesStack';
import { colors } from './src/theme';

const temaNavegacion = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: colors.fondo,
    card: colors.superficie,
    primary: colors.primario,
    text: colors.texto,
    border: colors.borde,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ReservaProvider>
        <NavigationContainer theme={temaNavegacion}>
          <StatusBar style="dark" />
          <ClasesStack />
        </NavigationContainer>
      </ReservaProvider>
    </SafeAreaProvider>
  );
}
