import { platform } from "react-native";
export const colors = {
    fondo: '#f4d1d1',
    superficie: '#fff',
    texto: '#111827',
    border: '#63bff4'
}

//Espaciado: Es la separación de las letras y los componentes

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    Xl: 20,
}

export const radius = {
    sm: 8,
    md: 16,
    lg: 24,
    full: 999,
}

export const typography = {
    titulo: {fontSize: 26, fontWeight: '800', color: colors.texto}
}

export default {colors, spacing, radius, typography}