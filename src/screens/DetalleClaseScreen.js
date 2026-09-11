import React, {useState, useMemo} from "react";
import { View, Text, Image, ScrollView, StyleSheet, Alert } from "react-native";
import { Ionicons} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {useResponsive} from '../hooks/useResponsive'
import EtiquetaNivel from '../components/EtiquetaNivel'
import { colors, spacing, typography, sombra } from "../theme";

export default function DetalleClaseScreen ({route, navigation}) {
    const insets = useSafeAreaInsets();
    const {clase} = route.params;


    return(
        <View style={StyleSheet.pantalla}>
            <ScrollView
                showsHorizontalScrollIndicator = {false}
                contentContainerStyle = {{paddingBottom:120}}
            >
                <Image source={{uri: clase.imagen}}  resizeMode="cover" style= {StyleSheet.portada} />

                //foto del profesor al lado de su nombre con apellido
                // Precio
                // duracion
                //cupos
                //horarios
                //boton reserva clase


            </ScrollView>

        </View>

    )
}