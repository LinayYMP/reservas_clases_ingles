import React, {useState, useEffect, useCallback, useMemo, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const agregarReserva = useCallback((clase,horario)=>{
        const nueva ={
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadoEn: new Date().toISOString(),
        }
        let resultados = {ok:true};
        setReservas ((prev) => {
            if(prev.some((r)=>r.id === nueva.id)){
                resultados = {ok: false}
                return prev; 
            }
            return [nueva, ...prev]
        })
    },[]);

    //lo que compartimos con todas las pantallas que esten dentro del provider
    const valor = useMemo(
        () => ({reservas, cargando, agregarReserva}),
        [reservas, cargando, agregarReserva]
    );

    return (
        <ReservasContext.Provider value={valor}>
            {children}
        </ReservasContext.Provider>
    );
}
