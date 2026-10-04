import react from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import { spacing, colors, radius } from "../theme";

export default function EstadoVacio ({icono='calendar-outline', titulo, mensaje, textoAccion='Limpiar filtros', OnAction}) {
    return (
    <View style={styles.contenedor}>
        <View style={styles.circulo}>
            <Ionicons name={icono} size={34} color={colors.primario}/>
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
        {OnAction && (
            <Pressable
                onPress={OnAction}
                style={({pressed}) => [styles.boton, pressed && {opacity: 0.8}]}
            >
                <Text style={styles.textoBoton}>{textoAccion}</Text>
            </Pressable>
        )}
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
  boton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    backgroundColor: colors.primario,
  },
  textoBoton: { fontSize: 15, fontWeight: '700', color: '#fff' },
});