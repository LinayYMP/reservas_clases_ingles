import React from 'react'
import { View, StyleSheet } from 'react-native'
import EstadoVacio from '../components/EstadoVacio'
import { colors } from '../theme'

//pantalla temporal: el registro del perfil se implementa mas adelante
export default function PerfilScreen() {
    return (
        <View style={styles.pantalla}>
            <EstadoVacio
                icono="person-outline"
                titulo="Perfil"
                mensaje="Aquí podrás registrar tus datos."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
})
