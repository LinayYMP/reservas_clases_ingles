import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import ClasesStack from '../navigation/ClasesStack'
import ReservasScreen from './ReservasScreen'
import PerfilScreen from './PerfilScreen'
import { colors } from '../theme'

const Tab = createBottomTabNavigator();

//icono de cada pestaña: relleno cuando esta activa y con borde cuando no
const ICONOS = {
    Inicio: ['home', 'home-outline'],
    Reservas: ['calendar', 'calendar-outline'],
    Perfil: ['person', 'person-outline'],
};

export default function InicioScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: colors.primario,
                tabBarInactiveTintColor: colors.textoSuave,
                tabBarIcon: ({ focused, color, size }) => {
                    const [activo, inactivo] = ICONOS[route.name];
                    return <Ionicons name={focused ? activo : inactivo} size={size} color={color} />
                },
            })}
        >
            {/* la pestaña Inicio contiene el stack de clases (lista -> detalle), que ya tiene su propio header */}
            <Tab.Screen
                name="Inicio"
                component={ClasesStack}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Reservas"
                component={ReservasScreen}
                options={{ title: 'Mis reservas', tabBarLabel: 'Reservas' }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{ title: 'Mi perfil', tabBarLabel: 'Perfil' }}
            />
        </Tab.Navigator>
    )
}
