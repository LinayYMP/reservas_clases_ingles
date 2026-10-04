import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {colors, spacing, radius} from '../theme'

export default function EtiquetaNivel({ nivel }){
    return (
        <View style={[styles.contenedor, {backgroundColor: colors.fondo}]}>
            <Text style= {styles.texto}>{nivel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        alignSelf: 'flex-start',
        paddingVertical: 3,
        paddingHorizontal: spacing.md,
        borderWidth: 1,
        borderColor: colors.borde,
        borderRadius: radius.full,
    },
    texto:{fontSize: 11, fontWeight: '700', letterSpacing: 0.3, color: colors.texto}
})
