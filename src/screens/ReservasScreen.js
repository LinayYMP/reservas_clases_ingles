import React from 'react'
import { View, Text, FlatList, Pressable, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import EstadoVacio from '../components/EstadoVacio'
import EtiquetaNivel from '../components/EtiquetaNivel'
import useReserva from '../hooks/useReserva'
import { formatearPrecio } from '../data/clases'
import { colors, spacing, radius, sombra } from '../theme'

//pide confirmacion antes de cancelar. En web Alert.alert no muestra botones, por eso se usa window.confirm
const confirmar = (titulo, mensaje, alConfirmar) => {
    if (Platform.OS === 'web') {
        if (window.confirm(`${titulo}\n\n${mensaje}`)) alConfirmar();
        return;
    }
    Alert.alert(titulo, mensaje, [
        { text: 'No', style: 'cancel' },
        { text: 'Sí, cancelar', style: 'destructive', onPress: alConfirmar },
    ]);
};

export default function ReservasScreen({ navigation }) {
    const { reservas, cargando, cancelarReserva } = useReserva();

    const pedirCancelacion = (reserva) => {
        confirmar(
            'Cancelar reserva',
            `¿Seguro que quieres cancelar ${reserva.titulo} (${reserva.horario})?`,
            () => cancelarReserva(reserva.id)
        );
    };

    //mientras se leen las reservas guardadas
    if (cargando) {
        return (
            <View style={[styles.pantalla, styles.centro]}>
                <ActivityIndicator size="large" color={colors.primario} />
            </View>
        );
    }

    return (
        <View style={styles.pantalla}>
            <FlatList
                data={reservas}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                renderItem={({ item }) => (
                    <View style={styles.tarjeta}>
                        <View style={styles.info}>
                            <EtiquetaNivel nivel={item.nivel} />
                            <Text style={styles.titulo}>{item.titulo}</Text>
                            <View style={styles.fila}>
                                <Ionicons name="calendar-outline" size={16} color={colors.primario} />
                                <Text style={styles.horario}>{item.horario}</Text>
                                <Text style={styles.detalle}>· {item.duracion} min</Text>
                            </View>
                            <Text style={styles.detalle}>{item.profesor} · {formatearPrecio(item.precio)}</Text>
                        </View>
                        <Pressable
                            onPress={() => pedirCancelacion(item)}
                            style={({ pressed }) => [styles.botonCancelar, pressed && { opacity: 0.7 }]}
                        >
                            <Ionicons name="trash-outline" size={18} color={colors.peligro} />
                            <Text style={styles.textoCancelar}>Cancelar</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={
                    <EstadoVacio
                        icono="calendar-outline"
                        titulo="Aún no tienes reservas"
                        mensaje="Cuando reserves una clase aparecerá aquí."
                        textoAccion="Ver clases"
                        OnAction={() => navigation.navigate('Inicio')}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    centro: { alignItems: 'center', justifyContent: 'center' },
    lista: { padding: spacing.lg, gap: spacing.md, flexGrow: 1 },
    tarjeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.lg,
        borderRadius: radius.md,
        backgroundColor: colors.superficie,
        ...sombra,
    },
    info: { flex: 1, gap: spacing.xs },
    titulo: { fontSize: 16, fontWeight: '700', color: colors.texto },
    fila: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    horario: { fontSize: 14, fontWeight: '600', color: colors.texto },
    detalle: { fontSize: 13, color: colors.textoSuave },
    botonCancelar: {
        alignItems: 'center',
        gap: 2,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.sm,
        backgroundColor: colors.peligroSuave,
    },
    textoCancelar: { fontSize: 12, fontWeight: '700', color: colors.peligro },
})
