import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert, Pressable, Platform } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useResponsive from '../hooks/useResponsive'
import EtiquetaNivel from '../components/EtiquetaNivel'
import { formatearPrecio } from '../data/clases'
import { useReservas } from '../context/ReservasContext'
import { colors, spacing, radius, typography, sombra } from "../theme";

//En web Alert.alert no muestra nada, por eso ahí se usa window.alert

const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
        window.alert(`${titulo}\n\n${mensaje}`);
        return;
    }
    Alert.alert(titulo, mensaje);
};

export default function DetalleClaseScreen ({route, navigation}) {
    const insets = useSafeAreaInsets();
    const {esTablet, paddingHorizontal} = useResponsive();
    const {clase} = route.params;

    const {cuposPorClase, reservarCupo} = useReservas();
    const cupos = cuposPorClase[clase.id];
    const sinCupos = cupos === 0;

    const reservarClase = () => {
        if (sinCupos) {
            mostrarAlerta('Sin cupos', 'Ya no hay más cupos disponibles para esta clase.');
            return;
        }

        reservarCupo(clase.id);

        if (cupos - 1 === 0) {
            mostrarAlerta('Sin cupos', 'Reservaste el último cupo. Ya no hay más cupos disponibles.');
        }
    };

    return(
        <View style={styles.pantalla}>
            <ScrollView
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{paddingBottom: 120 + insets.bottom}}
            >
                <Image source={{uri: clase.imagen}}  resizeMode="cover" style= {[styles.portada, {height: esTablet ? 320 : 220}]} />

                <View style={[styles.contenido, {paddingHorizontal}]}>
                    <EtiquetaNivel nivel={clase.nivel} />
                    <Text style={styles.titulo}>{clase.titulo}</Text>
                    <Text style={styles.descripcion}>{clase.descripcion}</Text>

                    {/* foto del profesor al lado del nombre */}
                    <View style={styles.tarjetaProfesor}>
                        <Image source={{uri: clase.profesor.foto}} style={styles.fotoProfesor} />
                        <View>
                            <Text style={styles.etiqueta}>Profesor</Text>
                            <Text style={styles.nombreProfesor}>{clase.profesor.nombre}</Text>
                            <Text style={styles.etiqueta}>{clase.profesor.pais}</Text>
                        </View>
                    </View>

                    {/* precio con formatearPrecio */}
                    <View style={styles.tarjetaPrecio}>
                        <Text style={styles.etiqueta}>Precio por clase</Text>
                        <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
                    </View>

                    {/* duracion y cupos */}
                    <View style={styles.fila}>
                        <View style={styles.dato}>
                            <Ionicons name="time-outline" size={22} color={colors.primario} />
                            <Text style={styles.valorDato}>{clase.duracion} min</Text>
                            <Text style={styles.etiqueta}>Duración</Text>
                        </View>

                        <View style={[styles.dato, sinCupos && styles.datoSinCupos]}>
                            <Ionicons name="people-outline" size={22} color={sinCupos ? colors.peligro : colors.primario} />
                            <Text style={[styles.valorDato, sinCupos && {color: colors.peligro}]}>{cupos}</Text>
                            <Text style={styles.etiqueta}>{sinCupos ? 'Sin cupos' : 'Cupos disponibles'}</Text>
                        </View>
                    </View>

                    {/* horarios */}
                    <Text style={styles.subtitulo}>Horarios</Text>
                    <View style={styles.horarios}>
                        {clase.horarios.map((horario) => (
                            <View key={horario} style={styles.horario}>
                                <Ionicons name="calendar-outline" size={16} color={colors.primario} />
                                <Text style={styles.textoHorario}>{horario}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* boton de reservar clase */}
            <View style={[styles.footer, {paddingHorizontal, paddingBottom: spacing.md + insets.bottom}]}>
                <Pressable
                    onPress={reservarClase}
                    style={({pressed}) => [
                        styles.boton,
                        sinCupos && styles.botonSinCupos,
                        pressed && {opacity: 0.8},
                    ]}
                >
                    <Ionicons name={sinCupos ? 'close-circle-outline' : 'checkmark-circle-outline'} size={20} color="#fff" />
                    <Text style={styles.textoBoton}>
                        {sinCupos ? 'Sin cupos disponibles' : 'Reservar clase'}
                    </Text>
                </Pressable>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    pantalla: {flex: 1, backgroundColor: colors.superficie},
    portada: {width: '100%'},
    contenido: {paddingTop: spacing.xl, gap: spacing.lg},
    titulo: {...typography.titulo, marginTop: -spacing.sm},
    descripcion: {fontSize: 15, lineHeight: 22, color: colors.textoSuave},
    etiqueta: {fontSize: 13, color: colors.textoSuave},
    tarjetaProfesor: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.superficie,
        ...sombra,
    },
    fotoProfesor: {width: 56, height: 56, borderRadius: radius.full},
    nombreProfesor: {fontSize: 17, fontWeight: '700', color: colors.texto},
    tarjetaPrecio: {
        padding: spacing.lg,
        borderRadius: radius.md,
        backgroundColor: colors.fondo,
    },
    precio: {fontSize: 24, fontWeight: '800', color: colors.texto, marginTop: spacing.xs},
    fila: {flexDirection: 'row', gap: spacing.md},
    dato: {
        flex: 1,
        alignItems: 'center',
        gap: spacing.xs,
        padding: spacing.lg,
        borderRadius: radius.md,
        backgroundColor: colors.primarioSuave,
    },
    datoSinCupos: {backgroundColor: colors.peligroSuave},
    valorDato: {fontSize: 20, fontWeight: '800', color: colors.texto},
    subtitulo: {...typography.subtitulo, marginBottom: -spacing.sm},
    horarios: {flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm},
    horario: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.borde,
    },
    textoHorario: {fontSize: 14, fontWeight: '600', color: colors.texto},
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: spacing.md,
        backgroundColor: colors.superficie,
        borderTopWidth: 1,
        borderTopColor: colors.primarioSuave,
    },
    boton: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        borderRadius: radius.md,
        backgroundColor: colors.primario,
    },
    botonSinCupos: {backgroundColor: colors.textoSuave},
    textoBoton: {fontSize: 16, fontWeight: '700', color: '#fff'},
});
