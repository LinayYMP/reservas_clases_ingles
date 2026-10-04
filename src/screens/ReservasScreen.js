import React from 'react'
import { View, StyleSheet } from 'react-native'
import EstadoVacio from '../components/EstadoVacio'
import { colors } from '../theme'

//pantalla temporal: el listado y la cancelacion de reservas se implementan mas adelante
export default function ReservasScreen() {
    return (
        <View style={styles.pantalla}>
            <EstadoVacio
                icono="calendar-outline"
                titulo="Aún no tienes reservas"
                mensaje="Cuando reserves una clase aparecerá aquí."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
})
