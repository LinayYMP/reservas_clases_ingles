import React from 'react'
import {View, Text, Image, Pressable, StyleSheet} from 'react-native'
import EtiquetaNivel from './EtiquetaNivel'
import {colors, spacing, radius, sombra} from '../theme'
import { formatearPrecio } from '../data/clases'


export default function Card ({clase, onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed}) => [styles.card, pressed && {opacity: 0.85}]}>
            <Image source={{uri: clase.imagen}} style={styles.imagen}/>
            <View style={styles.info}>
                <EtiquetaNivel nivel={clase.nivel}/>
                <Text style= {styles.titulo}>{clase.titulo}</Text>
                <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
                <Text style={styles.precio}>{formatearPrecio(clase.precio)}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: spacing.sm,
        borderRadius: radius.md,
        backgroundColor: colors.superficie,
        ...sombra,
    },
    imagen: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: radius.md,
        borderTopRightRadius: radius.md,
    },
    info: {padding: spacing.md, gap: spacing.xs},
    titulo: {fontSize: 16, fontWeight: '700', color: colors.texto},
    profesor: {fontSize: 13, color: colors.textoSuave},
    precio: {fontSize: 15, fontWeight: '700', color: colors.primario},
})
