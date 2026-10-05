import React, { useCallback, useMemo, createContext } from 'react';
import useAlmacenamiento from '../hooks/useAlmacenamiento';

const CLAVE_PERFIL = '@perfil_ingles';

export const PerfilContext = createContext(null);

//correo y telefono se validan al registrar y tambien al editar
const validarContacto = (correo, telefono) => {
    if (!/^\S+@\S+\.\S+$/.test(correo)) {
        return 'Escribe un correo válido, por ejemplo nombre@correo.com';
    }
    if (!/^\d{7,10}$/.test(telefono)) {
        return 'El teléfono debe tener entre 7 y 10 números.';
    }
    return null;
};

export function PerfilProvider({ children }) {
    //perfil es null mientras el usuario no se haya registrado
    const [perfil, guardarPerfil, listo] = useAlmacenamiento(CLAVE_PERFIL, null);

    //primer registro: aqui se guardan nombre y apellido, que despues ya no cambian
    const registrarPerfil = useCallback((datos) => {
        const nombre = datos.nombre.trim();
        const apellido = datos.apellido.trim();
        const correo = datos.correo.trim();
        const telefono = datos.telefono.trim();

        if (!nombre || !apellido) {
            return { ok: false, mensaje: 'El nombre y el apellido son obligatorios.' };
        }
        const error = validarContacto(correo, telefono);
        if (error) return { ok: false, mensaje: error };
        if (!datos.foto) {
            return { ok: false, mensaje: 'Agrega una foto de perfil.' };
        }

        guardarPerfil({ nombre, apellido, correo, telefono, foto: datos.foto });
        return { ok: true };
    }, [guardarPerfil]);

    //despues del registro solo se pueden cambiar correo y telefono:
    //se copian nombre, apellido y foto del perfil guardado y se reemplazan solo esos dos campos
    const actualizarContacto = useCallback((correo, telefono) => {
        const error = validarContacto(correo.trim(), telefono.trim());
        if (error) return { ok: false, mensaje: error };

        guardarPerfil({ ...perfil, correo: correo.trim(), telefono: telefono.trim() });
        return { ok: true };
    }, [perfil, guardarPerfil]);

    const valor = useMemo(
        () => ({ perfil, listo, registrarPerfil, actualizarContacto }),
        [perfil, listo, registrarPerfil, actualizarContacto]
    );

    return (
        <PerfilContext.Provider value={valor}>
            {children}
        </PerfilContext.Provider>
    );
}
