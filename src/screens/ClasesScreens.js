import React, {useState, useEffect, useMemo, Component} from 'react'
import {View, Text, Image, Pressable, StyleSheet, FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context' 
import EtiquetaNivel from './EtiquetaNivel'
import {colors, spacing, radius, typography} from '../theme'
import { formatearPrecio } from '../data/clases'
import { CLASES, NIVELES} from '../data/clases'
import { Color } from 'react-native/types_generated/Libraries/Animated/AnimatedExports'
import { ScrollView } from 'react-native'
import NivelChip from '../components/NivelChip'
import Card from  '../components'
import EstadoVacio from '../components/EstadoVacio'
import useResponsive from '../hooks/useResponsive'

export default function ClasesScreen ({ navigation }){
    const insets =  useSafeAreaInsets();
    const {columnas, paddingHorizontal} = useResponsive ();

    const[ nivel, setNivel ] = useState('Todos');
    const [ busqueda, setBusqueda] = useState();

    const resultados = useMemo(()=>{
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase)=>{
            const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coincidetexto = textoBusqueda || 
            textoBusqueda === ''||
            clase.profesor.nombre.toLowerCase().includes(textoBusqueda) ||
            clase.titulo.toLowerCase().incluides (textoBusqueda)
            return coincideNivel && coincidetexto
        })
    },[coincideNivel,coincidetexto]

);

    return(
        <View>
            <text>Aplicación de reservas para clases de inglés</text>
            <View>
                <Ionicons name='search' size={18} color={colors.Primario}/>
                <TextInput
                    value={busqueda}
                    onChangeText={setBusqueda}
                    placeholder='Ingrese el nombre o nivel para la busqueda'
                    autoCorrect= {false}
                    autoComplete= {false}
                />
                {
                     busqueda.length > 0 && (
                        <Ionicons
                            name="close-circle"
                            size={18}
                            color={colors.Primario}
                            onPress={()=>setBusqueda('')}
                        />
                     )
                }
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator= {false}
                style={{flexGrow:0}}
            >
                {
                    NIVELES.map((item) => (
                        <NivelChip
                            etiqueta={item}
                            activo={item}
                            onPress={() => setNivel(item)}
                        />
                    ))
                }
            </ScrollView>
            <FlatList
                data={resultados}
                keyExtractor={(item)=> item.id}
                renderItem={(item)=>(
                    <Card
                    clase={item}
                    onPress={()=> navigation.navigate('DetalleClase', {clase:item})}
                    />
                )}
                contentContainerStyle={{
                    paddingHorizontal,
                    flexGrow : 1
                }}
                numColumns={columnas}
                ListEmptyComponent={
                    <EstadoVacio
                    icono="search-outline"
                    titulo="No encontramoslos resultados"
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
