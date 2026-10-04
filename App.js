import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReservasProvider } from './src/context/ReservasContext';
import ClasesStack from './src/navigation/ClasesStack';

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
