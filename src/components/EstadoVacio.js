import react from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import { useColorScheme, spacing, colors } from "../theme";

export default function EstadoVacio ({icono='calendar-outline', titulo, mensaje, OnAction}) {
    return (
    <View style={styles.contenedor}>
        <View style={style.circulo}>
            <Ionicons name={icono} size={34} color={colors.primario}/>
        </View>
        <Text style={style.titulo}>{titulo}</Text>
        <Text style={style.mensaje}>{mensaje}</Text>
    </View>
)}


const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  titulo: { fontSize: 17, fontWeight: '700', color: colors.texto, textAlign: 'center' },
  mensaje: {
    fontSize: 14,
    color: colors.textoSuave,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});