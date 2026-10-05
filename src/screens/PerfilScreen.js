import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Image, Pressable, ScrollView, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import usePerfil from '../hooks/usePerfil'
import { colors, spacing, radius, typography } from '../theme'

//En web Alert.alert no muestra nada, por eso ahí se usa window.alert
const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
        window.alert(`${titulo}\n\n${mensaje}`);
        return;
    }
    Alert.alert(titulo, mensaje);
};

//etiqueta + caja de texto; si bloqueado es true se muestra gris con un candado y no se puede escribir
function Campo({ etiqueta, bloqueado, ...props }) {
    return (
        <View style={styles.campo}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <View style={[styles.caja, bloqueado && styles.cajaBloqueada]}>
                <TextInput
                    style={[styles.input, bloqueado && { color: colors.textoSuave }]}
                    editable={!bloqueado}
                    placeholderTextColor={colors.textoSuave}
                    {...props}
                />
                {bloqueado && <Ionicons name="lock-closed" size={16} color={colors.textoSuave} />}
            </View>
        </View>
    );
}

export default function PerfilScreen() {
    const { perfil, listo, registrarPerfil, actualizarContacto } = usePerfil();
    const registrado = perfil !== null;

    const [foto, setFoto] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    //cuando termina de cargar el perfil guardado, se llenan los campos con sus datos
    useEffect(() => {
        if (perfil) {
            setFoto(perfil.foto);
            setNombre(perfil.nombre);
            setApellido(perfil.apellido);
            setCorreo(perfil.correo);
            setTelefono(perfil.telefono);
        }
    }, [perfil]);

    //abre la galeria del telefono; la foto solo se elige durante el registro
    const elegirFoto = async () => {
        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            //en web la uri es temporal (blob:) y se pierde al recargar, por eso alli se pide la imagen como texto base64
            base64: Platform.OS === 'web',
        });
        if (!resultado.canceled) {
            const imagen = resultado.assets[0];
            setFoto(Platform.OS === 'web' ? `data:${imagen.mimeType};base64,${imagen.base64}` : imagen.uri);
        }
    };

    const guardar = () => {
        const resultado = registrado
            ? actualizarContacto(correo, telefono)
            : registrarPerfil({ nombre, apellido, correo, telefono, foto });

        if (!resultado.ok) {
            mostrarAlerta('Revisa los datos', resultado.mensaje);
            return;
        }
        mostrarAlerta(
            registrado ? 'Cambios guardados' : 'Perfil registrado',
            registrado ? 'Tu correo y teléfono se actualizaron.' : 'Desde ahora solo podrás modificar tu correo y teléfono.'
        );
    };

    //mientras se lee el perfil guardado
    if (!listo) {
        return (
            <View style={[styles.pantalla, styles.centro]}>
                <ActivityIndicator size="large" color={colors.primario} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
            <Text style={styles.titulo}>{registrado ? `Hola, ${perfil.nombre}` : 'Crea tu perfil'}</Text>

            <Pressable onPress={elegirFoto} disabled={registrado} style={styles.contenedorFoto}>
                {foto ? (
                    <Image source={{ uri: foto }} style={styles.foto} />
                ) : (
                    <View style={[styles.foto, styles.fotoVacia]}>
                        <Ionicons name="camera-outline" size={36} color={colors.primario} />
                    </View>
                )}
                {!registrado && <Text style={styles.textoFoto}>{foto ? 'Cambiar foto' : 'Agregar foto'}</Text>}
            </Pressable>

            <Campo etiqueta="Nombre" value={nombre} onChangeText={setNombre} placeholder="Tu nombre" bloqueado={registrado} />
            <Campo etiqueta="Apellido" value={apellido} onChangeText={setApellido} placeholder="Tu apellido" bloqueado={registrado} />
            <Campo
                etiqueta="Correo"
                value={correo}
                onChangeText={setCorreo}
                placeholder="nombre@correo.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Campo
                etiqueta="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                placeholder="3001234567"
                keyboardType="phone-pad"
            />

            {registrado && (
                <Text style={styles.nota}>El nombre, el apellido y la foto no se pueden modificar después del registro.</Text>
            )}

            <Pressable onPress={guardar} style={({ pressed }) => [styles.boton, pressed && { opacity: 0.8 }]}>
                <Ionicons name="save-outline" size={20} color="#fff" />
                <Text style={styles.textoBoton}>{registrado ? 'Guardar cambios' : 'Guardar'}</Text>
            </Pressable>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: colors.fondo },
    centro: { alignItems: 'center', justifyContent: 'center' },
    contenido: { padding: spacing.lg, gap: spacing.md },
    titulo: { ...typography.titulo, textAlign: 'center' },
    contenedorFoto: { alignItems: 'center', gap: spacing.xs, marginVertical: spacing.sm },
    foto: { width: 120, height: 120, borderRadius: radius.full },
    fotoVacia: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primarioSuave,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: colors.primario,
    },
    textoFoto: { fontSize: 14, fontWeight: '600', color: colors.primario },
    campo: { gap: spacing.xs },
    etiqueta: { fontSize: 13, fontWeight: '600', color: colors.textoSuave },
    caja: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: colors.borde,
        backgroundColor: colors.superficie,
    },
    cajaBloqueada: { backgroundColor: '#f3f4f6', borderColor: '#d1d5db' },
    input: { flex: 1, paddingVertical: spacing.md, fontSize: 15, color: colors.texto },
    nota: { fontSize: 13, color: colors.textoSuave, textAlign: 'center' },
    boton: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        marginTop: spacing.sm,
        borderRadius: radius.md,
        backgroundColor: colors.primario,
    },
    textoBoton: { fontSize: 16, fontWeight: '700', color: '#fff' },
})
