import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLASES, seCruzan } from '../data/clases';

const CLAVE_RESERVAS  =  '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservaProvider({children}) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState (true);

    //cargar las reaervas que tengo guardadas, si no tengo nada me devuelve un arreglo vacio 

    useEffect (()=>{
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if(guardado !== null) {
                    setReservas(JSON.parse(guardado))
                }
            }catch (error) {
                console.log ('error leyendo  reservas:' , error);
            }finally{
                setCargando(false)
            }
        };
        cargar();
    },[])

    //guardar  cada vez que cambie  el arreglo de reservas 
    useEffect (() => {
        if(cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=> 
            console.log('Error guardando reservas:', error)
        )
    }, [reservas, cargando]);

    //cupos disponibles de cada clase = cupos totales - reservas hechas de esa clase
    //ej: { '1': 8, '2': 7, ... }. Al cancelar una reserva el cupo se recupera solo
    const cuposPorClase = useMemo(() => {
        const cupos = {};
        CLASES.forEach((clase) => {
            const reservadas = reservas.filter((r) => r.claseId === clase.id).length;
            cupos[clase.id] = clase.cupos - reservadas;
        });
        return cupos;
    }, [reservas]);

    //devuelve {ok: true} si se guardo, o {ok: false, mensaje} para mostrarle al usuario por que no
    const agregarReserva = useCallback((clase,horario)=>{
        const nueva ={
            id: clase.id + '-' + horario,
            claseId: clase.id,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            duracion: clase.duracion,
            horario,
            creadoEn: new Date().toISOString(),
        }

        if(cuposPorClase[clase.id] <= 0){
            return {ok: false, mensaje: 'Ya no hay más cupos disponibles para esta clase.'};
        }

        if(reservas.some((r)=>r.id === nueva.id)){
            return {ok: false, mensaje: 'Ya tienes reservada esta clase en ese horario.'};
        }

        //no se puede reservar si choca con otra reserva que ya tenga el usuario
        const conflicto = reservas.find((r) => seCruzan(r, nueva));
        if(conflicto){
            return {ok: false, mensaje: `Se cruza con ${conflicto.titulo} (${conflicto.horario}).`};
        }

        setReservas((prev) => [nueva, ...prev]);
        return {ok: true};
    },[reservas, cuposPorClase]);

    const cancelarReserva = useCallback((id)=>{
        setReservas((prev) => prev.filter((r)=> r.id !== id));
    },[]);

    //lo que compartimos con todas las pantallas que esten dentro del provider
    const valor = useMemo(
        () => ({reservas, cargando, cuposPorClase, agregarReserva, cancelarReserva}),
        [reservas, cargando, cuposPorClase, agregarReserva, cancelarReserva]
    );

    return (
        <ReservasContext.Provider value={valor}>
            {children}
        </ReservasContext.Provider>
    );
}
