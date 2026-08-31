import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
import { Stack } from "expo-router";

const stack = createNativeStackNavigator();

export default function ClasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home"
                component={ClasesScreen}
                options={{headerShown: false, title: 'Home'}}
            />
        </Stack.Navigator>
    )
}
