import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReservasProvider } from './src/context/ReservasContext';
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
      <ReservasProvider>
        <NavigationContainer>
          <ClasesStack />
        </NavigationContainer>
      </ReservasProvider>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
