import React, {useState, useMemo} from 'react'
import {View, Text, TextInput, StyleSheet, FlatList, ScrollView} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {colors, spacing, radius, typography} from '../theme'
import { CLASES, NIVELES} from '../data/clases'
import NivelChip from '../components/NivelChip'
import Card from  '../components/Card'
import EstadoVacio from '../components/EstadoVacio'
import useResponsive from '../hooks/useResponsive'

export default function ClasesScreen ({ navigation }){
    const insets =  useSafeAreaInsets();
    const {columnas, paddingHorizontal} = useResponsive ();

    const[ nivel, setNivel ] = useState('Todos');
    const [ busqueda, setBusqueda] = useState('');

    const resultados = useMemo(()=>{
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase)=>{
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincidetexto = textoBusqueda === '' ||
            clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
            clase.titulo.toLowerCase().includes(textoBusqueda) ||
            clase.nivel.toLowerCase().includes(textoBusqueda)
            return coincideNivel && coincidetexto
        })
    },[nivel, busqueda]

);

    return(
        <View style={[styles.pantalla, {paddingTop: insets.top + spacing.md}]}>
            <Text style={[styles.titulo, {paddingHorizontal}]}>Aplicación de reservas para clases de inglés</Text>
            <View style={[styles.buscador, {marginHorizontal: paddingHorizontal}]}>
                <Ionicons name='search' size={18} color={colors.primario}/>
                <TextInput
                    style={styles.input}
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder='Ingrese el nombre o nivel para la busqueda'
                    placeholderTextColor={colors.textoSuave}
                    autoCorrect= {false}
                    autoComplete= "off"
                />
                {
                     busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.primario}
                            onPress={()=>setBusqueda('')}
                        />
                     )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator= {false}
                style={{flexGrow:0, flexShrink:0}}
                contentContainerStyle={{paddingHorizontal, paddingVertical: spacing.md}}
            >
                {
                    NIVELES.map((item) => (
                        <NivelChip
                            key={item}
                            etiqueta={item}
                            activo={nivel === item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                }
            </ScrollView>
            <FlatList
                key={columnas}
                data={resultados}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=>(
                    <Card
                    clase={item}
                    onPress={()=> navigation.navigate('DetalleClase', {clase:item})}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal: paddingHorizontal - spacing.sm,
                    paddingBottom: insets.bottom + spacing.lg,
                    flexGrow : 1
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    <EstadoVacio
                    icono="search-outline"
                    titulo="No encontramos resultados"
                    mensaje= "prueba con otra combinacion de palabras para la busqueda"
                    OnAction={()=>{
                        setNivel('Todos');
                        setBusqueda('');
                    }}
                    />
                }

            />
        </View>
    )
}

const styles = StyleSheet.create({
    pantalla: {flex: 1, backgroundColor: colors.fondo},
    titulo: {...typography.titulo, marginBottom: spacing.md},
    buscador: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.borde,
        backgroundColor: colors.superficie,
    },
    input: {flex: 1, paddingVertical: spacing.md, fontSize: 15, color: colors.texto},
})
