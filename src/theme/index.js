import { Platform } from "react-native";
export const colors = {
    fondo: '#f4d1d1',
    superficie: '#fff',
    texto: '#111827',
    textoSuave: '#4b5563',
    borde: '#63bff4',
    primario: '#1877b8',
    primarioSuave: '#e0f2fe',
    peligro: '#dc2626',
    peligroSuave: '#fee2e2',
}

//Espaciado: Es la separación de las letras y los componentes

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
}

export const radius = {
    sm: 8,
    md: 16,
    lg: 24,
    full: 999,
}

export const typography = {
    titulo: {fontSize: 26, fontWeight: '800', color: colors.texto},
    subtitulo: {fontSize: 18, fontWeight: '700', color: colors.texto},
}

//Sombra: iOS usa shadow*, Android usa elevation y la web usa boxShadow

export const sombra = Platform.select({
    ios: {
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 4},
    },
    android: {elevation: 3},
    default: {boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)'},
})

export default {colors, spacing, radius, typography, sombra}
